"use client"

import { useEffect, useState } from "react"

export default function PostSection() {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const postsPerPage = 4

  async function fetchPosts() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await res.json()
    setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(posts.length / postsPerPage)

  return (
    <>
      <div className="container mx-auto px-5 md:px-10">
        <div className="flex flex-col items-center gap-10">
          <h1>Post Section</h1>

          <div className="flex flex-wrap justify-center gap-6">
            {currentPosts.map((post) => (
              <div
                key={post?.id}
                className="max-w-[500px] w-full bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200 transition-transform hover:scale-105 hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold text-blue-700">
                    User #{post?.userId}
                  </h2>
                  <span className="text-xs text-gray-400">
                    Post ID: {post?.id}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {post?.title}
                </h3>
                <p className="text-gray-600">{post?.body}</p>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex gap-2 mb-20">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 text-black rounded disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-black"
                    : "bg-gray-100 text-black"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
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
