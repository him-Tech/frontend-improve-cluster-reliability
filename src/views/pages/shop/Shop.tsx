import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import * as stripeJs from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "./elements";
import { config } from "src/ultils";
import {CreatePaymentIntentBody, CreatePaymentIntentParams, CreatePaymentIntentQuery} from "../../../dtos";
import {StripeCustomerId} from "../../../model";

// TODO: lolo
const stripePromise = loadStripe(config.payment.stripePublishableKey);

// https://docs.stripe.com/elements/express-checkout-element
interface ShopProps {}

export function Shop(props: ShopProps) {
  const options: stripeJs.StripeElementsOptions = {
    mode: "payment", // 'payment' | 'setup' | 'subscription'
    amount: 1099,
    currency: "usd",
    appearance: {
      variables: {
        // This controls the border-radius of the rendered Express Checkout Element
        borderRadius: "4px",
      },
    },
  };


    const createPaymentIntentParams: CreatePaymentIntentParams = {}
    const createPaymentIntentBody: CreatePaymentIntentBody = {
        stripeCustomerId: new StripeCustomerId("cus_JZ2ZQ9J9JZ2ZQ9J9"),
        priceItems: []
    };
    const createPaymentIntentQuery: CreatePaymentIntentQuery = {};


  return (
    <>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm  createPaymentIntentBody={}/>
      </Elements>
    </>
  );
}
