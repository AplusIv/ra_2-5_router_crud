import Post from './Post';

const Posts = ({posts}) => {
  if (posts.length===0) {
    return <div>Пустой массив</div>;
  }
  return (
    <div>
      {posts.map(post => <Post key={post.id} id={post.id} created={post.created} content={post.content}/>)}
    </div>
  )
}

export default Posts