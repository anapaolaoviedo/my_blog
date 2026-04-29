import { useState } from "react";

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  function handleTitleChange(e) { setTitle(e.target.value); }
  function handleDateChange(e) { setDate(e.target.value); }
  function handleTextChange(e) { setText(e.target.value); }
  function handleFile(e) {
    const fileInfo = {
      file: e.target.files[0],
      filename: e.target.files[0].name
    };
    setImg(fileInfo);
  }

  function handleSubmit() {
    const formInfo = new FormData();
    formInfo.append('title', title);
    formInfo.append('date', date);
    formInfo.append('text', text);
    if (img) formInfo.append('img', img.file, img.filename);

    fetch(import.meta.env.VITE_API_URL + "/posts/new", {
      method: "POST",
      body: formInfo,
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.message);
      alert('Post creado correctamente!');
    })
    .catch((error) => console.log(error));
  }

  return (
    <div className="form">
      <h1>Nuevo Post</h1>
      <p>Título: <input type='text' value={title} onChange={handleTitleChange} /></p>
      <p>Fecha: <input type='date' value={date} onChange={handleDateChange} /></p>
      <p>Imagen: <input type='file' onChange={handleFile} /></p>
      <p>Texto: <textarea value={text} onChange={handleTextChange} /></p>
      <input type='submit' value='Crear Post' onClick={handleSubmit} />
    </div>
  );
}