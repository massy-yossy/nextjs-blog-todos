export async function getAllPostsData() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`)
  );
  const posts = await res.json();
  // 新しい順にソートする
  const filterPosts = posts.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  return filterPosts;
}

// ダイナミック用
export async function getPostIds() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`)
  );
  const posts = await res.json()
  return posts.map((post) => {
    return{
      params: {
        id: String(post.id)
      }
    }
  })
}
export async function getPostData(id){
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-post/${id}/`)
  );
  const post = await res.json()
  return post
}
