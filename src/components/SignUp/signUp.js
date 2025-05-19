"use client"

import Input from "../utils/input"
import { useFormik } from "formik"
import * as yup from "yup"

export default function SignUp({ setLog }) {
  const inputs = [
    {
      label: "Username",
      type: "text",
      placeholder: "Wirte User Name here",
      name: "username",
    },

    {
      label: "Email",
      type: "email",
      placeholder: "Email...",
      name: "email",
    },

    {
      label: "Password",
      type: "password",
      placeholder: "Password...",
      name: "password",
    },

    {
      label: "re-Password",
      type: "password",
      placeholder: "re-Password...",
      name: "rePassword",
    },
  ]

  const { values, setValues, errors, touched, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
        rePassword: "",
      },

      onSubmit: (data) => {
        alert(data.username)
      },

      validationSchema: yup.object().shape({
        username: yup.string().required().min(4).max(20),
        email: yup.string().required().email(),
        password: yup.string().required(),
        // .matches(
        //   "^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}"
        // )
        rePassword: yup
          .string()
          .required()
          .oneOf([yup.ref("password"), null], "Passwords Must Match"),
      }),
    })

  return (
    <div
      className="border border-gray-600 p-5 rounded-md bg-white/10
      w-[80%] mx-auto md:w-[25rem]"
    >
      <form onSubmit={handleSubmit} className="flex flex-col item-center gap-2">
        <h1 className="text-center text-xl uppercase pb-3">Sign Up</h1>

        {inputs.map((item, i) => (
          <Input
            key={i}
            item={item}
            values={values}
            setValues={setValues}
            touched={touched}
            errors={errors}
            handleBlur={handleBlur}
          />
        ))}

        <button
          type="submit"
          className="bg-white/20 p-3 mt-2 rounded-md hover:bg-white/40 text-xs"
        >
          Submit
        </button>
      </form>

      <p className="text-center pt-2 text-xs flex items-center justify-center gap-1">
        If you have an account
        <span
          onClick={() => setLog(true)}
          className="hover:opacity-40 cursor-pointer text-orange-300"
        >
          Sign In Here
        </span>
      </p>
    </div>
  )
}
