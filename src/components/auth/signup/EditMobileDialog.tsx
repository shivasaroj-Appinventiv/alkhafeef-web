"use client";

import { Formik } from "formik";
import * as Yup from "yup";
import { useEditMobile } from "./useEditMobile";

const mobileSchema = Yup.object({
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^5\d{8}$/, "Enter a valid Saudi mobile number"),
});

export default function EditMobileDialog() {
  const { countryCode, currentPhone, handlePhoneChange, startMobileVerification } =
    useEditMobile();

  return (
    <div className="p-6">
      <h2 className="text-center text-xl font-semibold text-gray-900">
        CHANGE MOBILE NUMBER
      </h2>

      <p className="mt-2 text-center text-sm text-gray-500">
        Current number: +{countryCode}-{currentPhone}
      </p>

      <Formik
        initialValues={{ phone: "" }}
        validationSchema={mobileSchema}
        onSubmit={(values, { setSubmitting }) =>
          startMobileVerification(values.phone, setSubmitting)
        }
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          setFieldValue,
          handleSubmit,
          isSubmitting,
          isValid,
        }) => (
          <form onSubmit={handleSubmit} className="mt-6" noValidate>
            <label
              htmlFor="new-phone"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              New Phone Number
            </label>

            <div className="flex h-14 overflow-hidden rounded-xl border border-gray-300">
              <div className="flex items-center border-r border-gray-200 bg-white px-4 font-medium text-gray-600">
                +{countryCode}
              </div>

              <input
                id="new-phone"
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

            {touched.phone && errors.phone ? (
              <p className="mt-2 text-sm text-red-500">{errors.phone}</p>
            ) : null}

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="mt-6 h-14 w-full rounded-full bg-orange-400 font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Sending OTP..." : "Verify"}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
