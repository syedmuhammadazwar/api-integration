import Link from "next/link"

export default function Navbar() {
  return (
    <>
      <div className="text-right container mx-auto px-5 md:px-10">
        <div className="text-right pt-10">
          <Link
            href={"/register"}
            className="bg-white p-3 rounded-2xl text-black font-bold"
          >
            Sign in / Sign Up
          </Link>
        </div>
      </div>
    </>
  )
}
