import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { Post } from "@/types";
import Image from "next/image";

  // Fetch posts data
async function getPosts(): Promise<Post[]> {
  try {
    const data = await client.fetch(`
      *[_type == "post"]{
        _id,
        title,
        slug,
        publishedAt,
        mainImage{
          asset->{
            url
          }
        }
      }
    `);
    return data;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
}

// BlogPosts Component
export default async function BlogPosts() {
  const posts: Post[] = await getPosts();

  if (!posts || posts.length === 0) {
    return <div>No posts found</div>;
  }
  return (
  <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post: Post) => (
        <div key={post._id}
        className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
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
              {/* Format and display the published date */}
              Published on: {new Date(post.publishedAt).toLocaleDateString()}
            </p>
            <Link href={`/posts/${post.slug?.current || ''}`} className="text-blue-500 hover:underline">
              Read More
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}