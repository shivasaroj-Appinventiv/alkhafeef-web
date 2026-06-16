"use client";

import OTPInput from "react-otp-input";
import { Formik } from "formik";
import { setStep } from "@/redux/slices/authModalSlice";
import { useAppDispatch } from "@/redux/hooks";
import { otpSchema } from "@/validations/auth.validation";
import { useOtpVerification } from "./useOtpVerfication";

interface OTPModalProps {
  mobileNo: string;
}

export default function OTPModal({
  mobileNo,
}: OTPModalProps) {
  const dispatch = useAppDispatch();
  const {
    verifyOtp,
    resendOtp,
    seconds,
  } = useOtpVerification(mobileNo);

  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = seconds % 60;

  return (
    <Formik
      initialValues={{
        otp: "",
      }}
      validationSchema={otpSchema}
      onSubmit={(values, { setSubmitting }) =>
        verifyOtp(
          {
            mobileNo,
            mobileOtp: values.otp,
          },
          setSubmitting
        )
      }
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        handleSubmit,
        isSubmitting,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="w-full"
        >
          <div className="border-b py-5 text-center">
            <h2 className="text-2xl font-bold">
              OTP CODE VERIFICATION
            </h2>
          </div>

          <div className="p-8">
            <p className="text-center text-gray-700 leading-7">
              We have sent a one-time password
              (OTP) to your phone number
            </p>

            <div className="mt-3 text-center">
              <span className="text-xl font-semibold">
                +966-{mobileNo}
              </span>

              <button
                type="button"
                onClick={() =>
                  dispatch(setStep("LOGIN"))
                }
                className="ml-2 text-orange-500 text-sm hover:underline"
              >
                Edit
              </button>
            </div>

            <div className="mt-8 flex justify-center">
              <OTPInput
                value={values.otp}
                onChange={(otp) =>
                  setFieldValue("otp", otp)
                }
                numInputs={6}
                shouldAutoFocus
                renderInput={(props) => (
                  <input
                    {...props}
                    className="
                    h-14
                    w-14
                    rounded-xl
                    border
                    border-gray-300
                    text-center
                    text-xl
                    font-semibold
                    outline-none
                    focus:border-orange-500
                  "
                  />
                )}
                containerStyle={{
                  gap: "10px",
                }}
              />
            </div>

            {touched.otp && errors.otp && (
              <p className="mt-3 text-center text-sm text-red-500">
                {errors.otp}
              </p>
            )}

            <button
              type="submit"
              disabled={
                values.otp.length !== 6 ||
                isSubmitting
              }
              className="
                mt-8
                h-14
                w-full
                rounded-full
                bg-[#EAA47A]
                font-semibold
                text-white
                transition
                hover:bg-[#e79260]
                cursor-pointer
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {isSubmitting
                ? "Verifying..."
                : "Verify"}
            </button>

            <div className="mt-8 text-center">
              {seconds > 0 ? (
                <p className="text-gray-700">
                  Resend code in{" "}
                  <span className="font-semibold text-orange-500">
                    {minutes}:
                    {remainingSeconds
                      .toString()
                      .padStart(2, "0")}
                  </span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={resendOtp}
                  className="
                    font-semibold
                    text-orange-500
                    hover:underline
                  "
                >
                  Resend OTP
                </button>
              )}
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}