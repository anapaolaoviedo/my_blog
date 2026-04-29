import "./App.css";
import { CardList } from "./components/Cards.jsx";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import Post from "./components/Post.jsx";
import Author from "./components/Author.jsx";
import NewPost from "./components/NewPost.jsx";
import Login from "./components/Login.jsx";

function App() {
  const [filteredText, setFilteredText] = useState('');
  const [posts, setPosts] = useState([]);   

  useEffect(() => {                          
    fetch(import.meta.env.VITE_API_URL + '/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  function handleChange(e) {
    setFilteredText(e.target.value);
  }

  return (
    <Routes>
      <Route path="/" element={
        <>
          <h1>Mathy bloggg</h1>
          <div className="filter">
            <p>Search: </p>
            <input type="text" value={filteredText} onChange={handleChange}></input>
          </div>
          <CardList entries={posts} filteredText={filteredText}></CardList>
        </>
      }/>
      <Route path="/blog/:id_post" element={<Post />}/>
      <Route path="/author/:id_author" element={<Author />}/>
      <Route path="/new" element={<NewPost />}/>
      <Route path="/login" element={<Login />}/>
    </Routes>
  )
}

export default App;