import { useEffect, useState } from "react";
import Auth from "./components/auth";
import { auth, db, storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);

  // New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState("");
  const [newMovieDirector, setNewMovieDirector] = useState("");

  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovies = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        director: newMovieDirector,
        userId: auth?.currentUser?.uid,
      });
      setNewMovieTitle("");
      setNewReleaseDate(0);
      setNewMovieDirector("");

      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };

  // Update Title State
  const [editedTitle, setEditedTitle] = useState("");

  const editMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: editedTitle });
    getMovieList();
  };

  // File Upload State
  const [fileUpload, setFileUpload] = useState(null);

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);

    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h2>Firebase Course</h2>
      <Auth />

      <h3>Crud Operations</h3>

      <input
        type="text"
        value={newMovieTitle}
        placeholder="Title of movie"
        onChange={(e) => setNewMovieTitle(e.target.value)}
      />
      <input
        type="number"
        value={newReleaseDate}
        placeholder="When was released?"
        onChange={(e) => setNewReleaseDate(Number(e.target.value))}
      />
      <input
        type="text"
        value={newMovieDirector}
        placeholder="Directed by..."
        onChange={(e) => setNewMovieDirector(e.target.value)}
      />
      <button onClick={onSubmitMovies}>Submit Movie</button>

      <div className="movie-container">
        {movieList.map((movie) => (
          <div key={movie.id} className="movie-card">
            <h4>{movie.title}</h4>
            <p>date: {movie.releaseDate}</p>
            <p>directed by {movie.director}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete</button>
            <br />
            <button onClick={() => editMovieTitle(movie.id)}>Edit Title</button>
            <input
              placeholder="New Title"
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: "32px" }}>
        <h3>Uploading Files</h3>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
