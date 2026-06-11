"use client";

import { Formik } from "formik";
import { loginSchema } from "@/validations/auth.validation";
import { setStep } from "@/redux/slices/authModalSlice";
import { useLogin } from "./useLogin";

export default function LoginModal() {
  const { login, dispatch, initialValues,handlePhoneChange } = useLogin();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      validateOnMount
      onSubmit={(values, { setSubmitting }) => login(values, setSubmitting)}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        isValid,
      }) => (
        <form onSubmit={handleSubmit} className="p-6" noValidate>
          <h2 className="text-center text-xl font-semibold text-gray-900">
            SIGN IN
          </h2>

          <div className="mt-6">
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>

            <div className="flex h-14 overflow-hidden rounded-xl border border-gray-300 bg-white focus-within:border-orange-400">
              <div className="flex items-center border-r border-gray-200 px-4 text-gray-600 font-medium">
                +966
              </div>

              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="5XXXXXXXX"
                value={values.phone}
                onBlur={handleBlur}
                onChange={(e) => {
                  setFieldValue("phone", handlePhoneChange(e.target.value));
                }}
                className="flex-1 px-4 outline-none"
              />
            </div>

            {touched.phone && errors.phone && (
              <p className="mt-2 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid || values.phone.length !== 9 || isSubmitting}
            className="mt-6 h-14 w-full rounded-full bg-orange-400 font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Sending OTP..." : "Get OTP"}
          </button>

          <p className="mt-5 text-center text-xs text-gray-500">
            By signing up, you agree to our{" "}
            <span className="font-medium text-orange-500 cursor-pointer">
              Terms of Use
            </span>{" "}
            and{" "}
            <span className="font-medium text-orange-500 cursor-pointer">
              Privacy Policy
            </span>
          </p>

          <div className="mt-6 text-center">
            <span className="text-sm text-gray-500">
              Don't have an account?
            </span>

            <button
              type="button"
              onClick={() => dispatch(setStep("SIGNUP"))}
              className="ml-2 text-sm font-semibold text-orange-500 hover:text-orange-600 cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}
