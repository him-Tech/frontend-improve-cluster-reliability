import React from "react";
import trustUs from "src/assets/why-u-trust-us.webp";

const WhyTrustUs = () => {
  return (
    <section className="3xl:max-w-[1617px] !px-4 xl:max-w-[90%] 2xl:max-w-[1440px]  mx-auto justify-center gap-14 flex items-center xl:flex-row flex-col 3xl:gap-[112px]">
      {/* ======= Left Image ====  */}
      <div className="max-w-[620px] 3xl:max-w-[833px] xl:w-1/2  w-full !bg-secondary bg-opacity-30 rounded-full flex justify-center items-center p-10 3xl:p-24 shadow-[5px_8px_10px_0px_rgba(255,255,255,0.08)_inset]">
        <img src={trustUs} alt="" className=" object-cover" />
      </div>
      <div className="max-w-[620px] 3xl:max-w-[700px] w-full xl:w-[47%]">
        <h1 className="text-3xl 3xl:text-[40px] font-semibold font-montserrat sm:text-nowrap">
          <span className="relative pb-3 lg:pb-5">
            Why You Can
            <span className="absolute sm:block hidden left-0 w-[80%] bottom-0 h-[4px] bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B]"></span>
          </span>{" "}
          Trust Us
        </h1>

        <p className="font-montserrat text-base sm:text-xl font-medium 3xl:text-2xl mt-8">
          We’ve been working tirelessly for free, dedicating our time, energy, and sometimes even our health to keep Pekko open-source and available to
          everyone.
        </p>
        <p className="font-montserrat text-base sm:text-xl font-medium 3xl:text-2xl mt-6">
          We believe in transparency and accountability, and every dollar raised will go towards improving Pekko’s reliability.
        </p>
      </div>
    </section>
  );
};

export default WhyTrustUs;
