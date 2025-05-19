import * as Yup from "yup"

export const ValidationSchema = Yup.object().shape({
  username: Yup.string().required().min(4).max(20),
  email: Yup.string().required().email(),
  password: Yup.string().required(),
  // .matches("^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}"),
  rePassword: Yup?.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords Must Match"),
})
