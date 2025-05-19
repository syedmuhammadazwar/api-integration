"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useCallback } from "react"

export default function SinglePostAndComment() {
  const params = useParams()
  const [post, setPost] = useState()
  const [postComments, setPostComments] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchSinglePost() {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${params.postId}`
      )
      const data = await res.json()

      setPost(data)
    }

    fetchSinglePost()
  }, [params.postId])

  // Use CallBack Prefer IT
  const fetchPostComments = useCallback(async () => {
    setIsLoading(true)

    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${params.postId}/comments`
    )
    const data = await res.json()

    setTimeout(() => {
      setIsLoading(false)
    }, 1300)

    setPostComments(data)
  }, [params.postId])

  useEffect(() => {
    fetchPostComments()
  }, [params.postId, fetchPostComments])

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div className="flex items-center justify-center py-20 container mx-auto px-5 md:px-10">
        <div className="justify-center gap-6">
          <div className="max-w-[500px] w-full bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200 transition-transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-blue-700">
                User # {post?.id}
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
        </div>
      </div>

      {/* Comment */}
      <div className="container mx-auto px-5 md:px-10">
        <div className="flex flex-col items-center gap-10">
          <h2 className="text-2xl">Comments Section</h2>

          <div className="grid grid-cols-3 justify-center gap-6">
            {postComments.map((comment) => (
              <div
                key={comment?.id}
                className="max-w-[500px] w-full bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200 transition-transform hover:scale-105 hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold text-blue-700">
                    Comment #&nbsp;{comment?.id}
                  </h2>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                  {comment?.name}
                </h3>

                <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-1">
                  Email: {comment?.email}
                </h3>

                <p className="text-gray-600 line-clamp-3">{comment?.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
