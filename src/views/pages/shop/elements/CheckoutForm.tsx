import React, {useState} from "react";
import {LinkAuthenticationElement, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import * as stripeJs from "@stripe/stripe-js";
import {FieldOption} from "@stripe/stripe-js/dist/stripe-js/elements/payment";
import {getBackendAPI} from "src/services";
import {ApiError} from "src/ultils/error/ApiError";
import {CreatePaymentIntentBody, CreatePaymentIntentParams, CreatePaymentIntentQuery} from "src/dtos";

interface CheckoutFormProps {
  userEmail?: string;
  /** You can also append your own query parameters for use on the return page. */
  returnUrl: string
  createPaymentIntentParams: CreatePaymentIntentParams;
  createPaymentIntentBody: CreatePaymentIntentBody;
  createPaymentIntentQuery: CreatePaymentIntentQuery;
}

export function CheckoutForm(props: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const backendApi = getBackendAPI();

  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    // Create the PaymentIntent and obtain clientSecret
    const params = props.createPaymentIntentParams;
    const body = props.createPaymentIntentBody;
    const query = props.createPaymentIntentQuery;
    const response = await backendApi.createPaymentIntent(params, body, query);
    if (response instanceof ApiError) {
      setMessage(response.message);
      return;
    } else if (!response.paymentIntent.client_secret) {
      setMessage("Client secret not found");
      return;
    }

    const clientSecret = response.paymentIntent.client_secret;

    // Confirm the PaymentIntent using the details collected by the Express Checkout Element
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: props.returnUrl, // Make sure to change this to your payment completion page
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message ?? null);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsProcessing(false);
  };

  const linkAuthenticationElementOptions: stripeJs.StripeLinkAuthenticationElementOptions = {};

  if (props.userEmail) {
    linkAuthenticationElementOptions.defaultValues = {email: props.userEmail};
  }

  const paymentElementOptions: stripeJs.StripePaymentElementOptions = {
    defaultValues: {
      billingDetails: {
        email: props.userEmail,
      },
    },
    readOnly: true,
    fields: {
      billingDetails: `never` as FieldOption,
    },
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" options={linkAuthenticationElementOptions} />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">{isProcessing ? "Processing ... " : "Pay now"}</span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
