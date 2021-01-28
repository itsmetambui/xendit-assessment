import * as yup from "yup";

export const emailSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email")
    .max(255),
});

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(255),
});

export const loginSchema = yup
  .object()
  .concat(emailSchema)
  .concat(passwordSchema);

export const registerSchema = yup
  .object({
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .when("password", {
        is: (val: any) => (val && val.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf([yup.ref("password")], "Both password need to be the same"),
      }),
  })
  .concat(emailSchema)
  .concat(passwordSchema);
