import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types";

async function getAllPosts(): Promise<Post[]> {
  try {
    const posts = await client.fetch(`
      *[_type == "post"]{
        _id,
        title,
        slug,
        publishedAt,
        mainImage {
          asset->{
            url
          }
        },
        excerpt
      }
    `);
    return posts;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export default async function PostsPage() {
  const posts = await getAllPosts();

  if (!posts || posts.length === 0) {
    return <div>No posts found.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">📝 Explore Blog Posts</h1>
      <p className="text-center mb-6 text-lg text-gray-700">
      Welcome to our blog archive! Explore our latest insights, tips, and guides on dental care.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: Post) => (
          <div
            key={post._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            {post.mainImage?.asset?.url && (
              <div className="relative h-48 w-full">
                <Image
                  src={post.mainImage.asset.url}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-500 text-sm mb-4">
                Published on: {new Date(post.publishedAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-4">
                {post.excerpt || "No summary available."}
              </p>
              <Link
                href={`/posts/${post.slug.current}`}
                className="text-blue-500 hover:underline"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
