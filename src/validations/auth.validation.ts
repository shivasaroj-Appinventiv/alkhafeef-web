import * as Yup from "yup";

export const loginSchema = Yup.object({
  phone: Yup.string()
    .required("Phone number is required")
    .matches(
      /^5\d{8}$/,
      "Enter a valid Saudi mobile number"
    ),
});


export const signupSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Name is required")
    .min(2, "Name must contain at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),

  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .nullable(),

  phone: Yup.string()
    .required("Phone number is required")
    .matches(
      /^5\d{8}$/,
      "Enter a valid Saudi mobile number"
    ),
});


export const otpSchema = Yup.object({
  otp: Yup.string()
    .required("OTP is required")
    .matches(/^\d{6}$/, "Enter valid OTP"),
});