"use client";

import { Formik } from "formik";
import { signupSchema } from "@/validations/auth.validation";
import { useSignup } from "./useSignup";
import { useAppSelector } from "@/redux/hooks";
import ProfileEditForm from "./ProfileEditForm";

export default function SignupModal() {
  const { context } = useAppSelector((state) => state.authModal);
  const { handleSubmit, initialValues, handlePhoneChange, handleSignin } =
    useSignup();
  const isEditMode = context === "profile";

  if (isEditMode) {
    return <ProfileEditForm />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signupSchema}
      validateOnMount
      enableReinitialize
      onSubmit={(values, { setSubmitting }) =>
        handleSubmit(values, setSubmitting)
      }
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        isValid,
      }) => (
        <form onSubmit={handleSubmit} className="p-6" noValidate>
          <h2 className="text-center text-xl font-semibold text-gray-900">
            SIGN UP
          </h2>

          <div className="mt-6">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4 outline-none focus:border-orange-400"
            />

            {touched.name && errors.name && (
              <p className="mt-2 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="mt-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter email address"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4 outline-none focus:border-orange-400"
            />

            {touched.email && errors.email && (
              <p className="mt-2 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="mt-4">
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>

            <div className="flex h-14 overflow-hidden rounded-xl border border-gray-300">
              <div className="flex items-center border-r border-gray-200 bg-white px-4 font-medium text-gray-600">
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
                onChange={(e) =>
                  setFieldValue("phone", handlePhoneChange(e.target.value))
                }
                className="flex-1 bg-white px-4 outline-none"
              />
            </div>

            {touched.phone && errors.phone && (
              <p className="mt-2 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="mt-6 h-14 w-full rounded-full bg-orange-400 font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Creating Account..." : "Continue"}
          </button>

          <p className="mt-5 text-center text-xs text-gray-500">
            By signing up, you agree to our{" "}
            <span className="cursor-pointer font-medium text-orange-500">
              Terms of Use
            </span>{" "}
            and{" "}
            <span className="cursor-pointer font-medium text-orange-500">
              Privacy Policy
            </span>
          </p>

          <div className="mt-6 text-center">
            <span className="text-sm text-gray-500">
              Already have an account?
            </span>

            <button
              type="button"
              onClick={handleSignin}
              className="ml-2 cursor-pointer text-sm font-semibold text-orange-500 hover:text-orange-600"
            >
              Sign In
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}
