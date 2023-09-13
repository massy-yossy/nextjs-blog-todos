import Link from "next/link";
import Layout from "../components/Layout";
import { getAllPostsData } from "../lib/posts";
import Post from "../components/Post";

export async function getStaticProps() {
  const filterPost = await getAllPostsData();
  return{
    props: {filterPost},
    revalidate: 3
  }
}

export default function BlogPage({filterPost}) {
  return (
    <Layout title="blog page">
      <ul>
        {filterPost && filterPost.map((post) => <Post key={post.id} post={post} /> )}
      </ul>
      <Link href="main-page">
        <div className="flex cursor-pointer mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
        </div>
      </Link>
      <span>Back to main page</span>
    </Layout>
  );
}
