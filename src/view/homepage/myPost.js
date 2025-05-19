"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function MyPost() {
  const router = useRouter()

  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const [postsPerPage] = useState(12)

  // 4
  const indexOfLastPost = currentPage * postsPerPage
  // 0
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  // 0 to 4
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
  // 25
  const totalPages = Math.ceil(posts.length / postsPerPage)

  async function fetchPosts() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await res.json()
    setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  console.log(posts)

  return (
    <>
      <div className="container mx-auto px-5 md:px-10">
        <div className="flex flex-col items-center gap-10">
          <h1>Post Section</h1>

          <div className="grid grid-cols-3 justify-center gap-6">
            {currentPosts.map((post) => (
              <div
                key={post?.id}
                onClick={() => router.push(`/${post?.id}`)}
                className="max-w-[500px] w-full bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200 transition-transform hover:scale-105 hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold text-blue-700">
                    User #&nbsp;{post?.id}
                  </h2>
                  <span className="text-xs text-gray-400">
                    Post ID: {post?.userId}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                  {post?.title}
                </h3>
                <p className="text-gray-600 line-clamp-3">{post?.body}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex gap-2 mb-20">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 bg-gray-200 text-black rounded disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((next) => Math.min(next + 1, totalPages))
              }
              className="px-3 py-1 bg-gray-200 text-black rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
