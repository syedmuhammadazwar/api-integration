"use client"

import { useState } from "react"
import Login from "../Login/login"
import SignUp from "../SignUp/signUp"

export default function Auth() {
  const [log, setLog] = useState(false)

  return <>{log ? <Login setLog={setLog} /> : <SignUp setLog={setLog} />}</>
}
