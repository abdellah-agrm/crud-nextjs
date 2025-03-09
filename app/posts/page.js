"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:5000/posts");
    setPosts(res.data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);


  return (
    <div className="min-h-screen bg-orange-50">
      <div className="container mx-auto pt-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-orange-800">All Posts</h1>
          <Link
            href="/posts/create"
            className="bg-orange-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-orange-700 transition-colors shadow-md flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create New Post
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-orange-100">
          <table className="min-w-full divide-y divide-orange-200">
            <thead className="bg-orange-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">#Id</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">Content</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-orange-800 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-100">
              {posts.map((item, index) => (
                <tr key={index} className="hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    <Link href={"/posts/" + item.id} className="text-orange-600 hover:text-orange-800 font-medium">
                      {item.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-md truncate">
                    {item.content}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-4">
                      <button
                        type="button"
                        className="text-orange-600 hover:text-orange-800 font-medium transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-800 font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
