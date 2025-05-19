"use client"

import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/effect-cards"
import { EffectCards } from "swiper/modules"

export default function PostCardSwiper() {
  const [posts, setPosts] = useState([])

  async function fetchPosts() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await res.json()
    setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <>
      <div className="mb-20 container mx-auto px-5 md:px-10">
        <div className="flex flex-col items-center gap-10">
          <h1>Post Section</h1>

          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            {posts.map((post) => (
              <SwiperSlide key={post?.id}>
                <div className="max-w-[500px] w-full bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold text-blue-700">
                      User #{post?.userId}
                    </h2>
                    <span className="text-xs text-gray-400">
                      Post ID: {post?.id}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-gray-800 line-clamp-2 mb-2">
                    {post?.title}
                  </h3>
                  <p className="text-gray-600 h-full line-clamp-8 text-sm">
                    {post?.body}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  )
}
