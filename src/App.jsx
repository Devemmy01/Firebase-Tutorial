import { useEffect, useState } from "react";
import Auth from "./components/auth";
import "./App.css";
import { db } from "./config/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";

const App = () => {
  const [movieList, setMovieList] = useState([]);

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(true);

  const moviesCollectionRef = collection(db, "movies");

  const getMovies = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const onSubmit = async () => {
    try{
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseData: newReleaseDate,
        isOscar: isNewMovieOscar,
      });

      getMovies();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Auth />

      <input
        type="text"
        placeholder="Movie title..."
        onChange={(e) => setNewMovieTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Release year..."
        onChange={(e) => setNewReleaseDate(Number(e.target.value))}
      />
      <input type="checkbox" checked={isNewMovieOscar} onChange={(e) => setIsNewMovieOscar(e.target.checked)} />
      <label> Received an Oscar</label>

      <button onClick={onSubmit}>Submit Movie</button>

      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
            <p>Date: {movie.releaseData}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
