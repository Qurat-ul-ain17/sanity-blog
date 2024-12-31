'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">🦷 Dental Blog</Link>
        <div className="space-x-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/post" className="hover:underline">Posts</Link>
        </div>
      </div>
    </nav>
  );
}
