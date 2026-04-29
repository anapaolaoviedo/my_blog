import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Post() {
  const { id_post } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/posts/' + id_post)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id_post]);

  return (
    <>
      {post.image && <img src={"http://localhost:5173/" + post.image} alt="Imagen del post" />}
      <h1>{post.title}</h1>
      <h2>Escrito por: {post.id_author}</h2>
      <h2>{post.date ? new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'}) : ''}</h2>
      <p>{post.text}</p>
    </>
  );
}