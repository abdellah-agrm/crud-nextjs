"use client";

import { useEffect, useState } from "react";

export default function EditPost({ params }) {
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
      console.log(res.data);
    } catch (error) {
      console.error("Failed to fetch post:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put("http://localhost:5000/posts", { id, title, content });
    router.push("/");
    // console.log({ id, title, content });
  };


  return (
    <div className="min-h-screen bg-orange-50">
      <div className="container mx-auto pt-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-orange-800">Edit Post</h1>
        </div>

        {
          post && (
            <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-lg border border-orange-100">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors shadow-md"
                  >
                    Create Post
                  </button>
                </div>
              </form>
            </div>
          )
        }
      </div>
    </div>
  )
}
