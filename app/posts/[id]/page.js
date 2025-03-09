"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PostDetails({ params }) {
  const id = params.id;
  const [post, setPost] = useState();

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/posts/${id}`);
      setPost(res.data);
    } catch (error) {
      console.error("Failed to fetch post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50">
      <div className="container mx-auto pt-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-orange-800">Post Details</h1>
          <Link
            href="/posts"
            className="bg-orange-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-orange-700 transition-colors shadow-md flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Posts
          </Link>
        </div>

        {post && (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-orange-100">
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                ID: {post.id}
              </span>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h2>

            <div className="prose max-w-none mt-6 text-gray-700">
              <p className="text-lg leading-relaxed whitespace-pre-wrap">{post.content}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-orange-100 flex gap-4">
              <button
                type="button"
                className="px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors shadow-md"
              >
                Edit Post
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-white text-red-600 font-medium rounded-lg border border-red-200 hover:bg-red-50 transition-colors shadow-sm"
              >
                Delete Post
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
