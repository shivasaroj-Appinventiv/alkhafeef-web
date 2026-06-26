"use client";

import { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import { Pencil } from "lucide-react";
import * as Yup from "yup";
import { useProfileEdit } from "./useProfileEdit";
import { useAppDispatch } from "@/redux/hooks";
import { setProfileStep } from "@/redux/slices/authModalSlice";

const profileEditSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Name is required")
    .min(2, "Name must contain at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  email: Yup.string().trim().email("Enter a valid email address").nullable(),
  phone: Yup.string().matches(/^5\d{8}$/, "Enter a valid Saudi mobile number"),
});

function getEditableInputClasses(isEditable: boolean) {
  if (isEditable) {
    return "h-14 w-full rounded-xl border-2 border-orange-400 bg-white pr-4 pl-4 text-gray-900 shadow-sm outline-none ring-4 ring-orange-50 transition focus:border-orange-500 focus:ring-orange-100";
  }

  return "h-14 w-full rounded-xl border border-dashed border-gray-300 bg-gray-100 pr-14 pl-4 text-gray-500 outline-none transition";
}

interface EditableFieldProps {
  label: string;
  htmlFor: string;
  isEditable: boolean;
  onEdit: () => void;
  error?: string;
  children: React.ReactNode;
  showEditButton?: boolean;
}

function EditableField({
  label,
  htmlFor,
  isEditable,
  onEdit,
  error,
  children,
  showEditButton = true,
}: EditableFieldProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
          {label}
        </label>

        {isEditable ? (
          <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-semibold text-orange-600">
            Editing
          </span>
        ) : (
          <span className="text-xs text-gray-400">Tap pencil to edit</span>
        )}
      </div>

      <div className="relative">
        {children}

        {showEditButton && !isEditable ? (
          <button
            type="button"
            onClick={onEdit}
            aria-label={`Edit ${label.toLowerCase()}`}
            className="absolute right-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#f26a21] text-white shadow-md transition hover:bg-[#e05f1c] cursor-pointer"
          >
            <Pencil size={14} />
          </button>
        ) : null}
      </div>

      {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
    </div>
  );
}

export default function ProfileEditForm() {
  const dispatch = useAppDispatch();
  const { initialValues, countryCode, handleSubmit } = useProfileEdit();
  const [editableFields, setEditableFields] = useState({
    name: false,
    email: false,
  });

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editableFields.name) {
      nameInputRef.current?.focus();
    }
  }, [editableFields.name]);

  useEffect(() => {
    if (editableFields.email) {
      emailInputRef.current?.focus();
    }
  }, [editableFields.email]);

  const openMobileDialog = () => {
    dispatch(setProfileStep("MOBILE"));
  };

  const enableField = (field: "name" | "email") => {
    setEditableFields((current) => ({ ...current, [field]: true }));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={profileEditSchema}
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
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit} className="p-6" noValidate>
          <h2 className="text-center text-xl font-semibold text-gray-900">
            EDIT PROFILE
          </h2>

          <div className="mt-6">
            <EditableField
              label="Full Name"
              htmlFor="name"
              isEditable={editableFields.name}
              onEdit={() => enableField("name")}
              error={touched.name && errors.name ? errors.name : undefined}
            >
              <input
                ref={nameInputRef}
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                readOnly={!editableFields.name}
                tabIndex={editableFields.name ? 0 : -1}
                className={getEditableInputClasses(editableFields.name)}
              />
            </EditableField>
          </div>

          <div className="mt-4">
            <EditableField
              label="Email Address"
              htmlFor="email"
              isEditable={editableFields.email}
              onEdit={() => enableField("email")}
              error={touched.email && errors.email ? errors.email : undefined}
            >
              <input
                ref={emailInputRef}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter email address"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                readOnly={!editableFields.email}
                tabIndex={editableFields.email ? 0 : -1}
                className={getEditableInputClasses(editableFields.email)}
              />
            </EditableField>
          </div>

          <div className="mt-4">
            <EditableField
              label="Phone Number"
              htmlFor="phone"
              isEditable={false}
              onEdit={openMobileDialog}
            >
              <div className="flex h-14 overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-100 pr-14">
                <div className="flex items-center border-r border-gray-200 bg-gray-50 px-4 font-medium text-gray-500">
                  +{countryCode}
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={values.phone}
                  readOnly
                  tabIndex={-1}
                  className="flex-1 cursor-default bg-gray-100 px-4 text-gray-500 outline-none"
                />
              </div>
            </EditableField>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 h-14 w-full rounded-full bg-orange-400 font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </form>
      )}
    </Formik>
  );
}
