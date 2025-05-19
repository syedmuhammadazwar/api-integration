"use client"

import { useState } from "react"

export default function Input({
  item,
  values,
  setValues,
  touched,
  errors,
  handleBlur,
}) {
  const { type, placeholder, name, label } = item

  return (
    <>
      <label className="text-xs">{label}</label>
      <input
        type={type}
        value={values[name]}
        placeholder={placeholder}
        name={name}
        className={`w-full p-3 outline-none bg-transparent text-xs
        border border-gray-600 rounded-md focus:border-gray-300
        ${errors[name] ? "border-red-400 focus:border-red-400" : ""}
        `}
        onChange={(e) =>
          setValues((prev) => ({ ...prev, [name]: e.target.value }))
        }
        onBlur={handleBlur}
      />

      {errors[name] && touched[name] && (
        <span className="text-xs text-red-400">{errors[name]}</span>
      )}
    </>
  )
}
