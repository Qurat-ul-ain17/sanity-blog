// @ts-nocheck
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import CommentSection from "@/components/CommentSection";
import { Post } from "@/types";


interface BlogPostProps {
  params: Record<string, string>;
}

async function getPost(slug: string): Promise<Post | null> {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    body,
    mainImage {
      asset->{
        url
      }
    },
    publishedAt
  }`;
  return await client.fetch(query, { slug });
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = params;
  const post = await getPost(slug);

  if (!post) {
    return <div  className="text-center text-red-500 mt-12">Post not found</div>;
  }
  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Blog Header */}
        <div className="p-6 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{post.title}</h1>
          <p className="text-gray-500 mb-4">
            🗓️ Published on: {new Date(post.publishedAt).toLocaleDateString()}
          </p>
          {post.mainImage?.asset?.url && (
            <div className="relative w-full h-80 mb-6">
              <Image
                src={post.mainImage.asset.url}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Blog Content */}
        <div className="p-6 text-lg text-gray-700 leading-relaxed text-center">
          {post.body || "No content available."}
        </div>

        {/* Comment Section */}
        <div className="p-6 border-t border-gray-200">
          <CommentSection />
        </div>
      </div>
    </div>
  );
}