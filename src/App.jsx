import React, { useState,useEffect } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import {useDebounce} from "react-use"
import { getTrendingMovies, updateSearchCount } from "./appwrite";

const API_BASE_URL = 'https://www.omdbapi.com';
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

//const API_OPTIONS ={
//  method: 'GET',
//  headers :{
//    accept:'application/json',
//    Authorization: `Bearer ${API_KEY}`
//
//  }
//}

const App = ()=>{
const [searchTerm, setSearchTerm]= useState('');
const [errorMessage,setErrorMessage] =useState('');
const [movieList,setMovieList] = useState([]);
const [isLoading,setIsLoading] =useState(false);
const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
const [trendingMovies,setTrendingMovies] = useState([]);




useDebounce(()=>setDebouncedSearchTerm(searchTerm),600,[searchTerm])


const fetchMovies = async(Search='')=>{
  setIsLoading(true);
  setErrorMessage('');
console.log("API KEY:", import.meta.env.VITE_OMDB_API_KEY);
  try{
      const endpoint = Search ?
      `${API_BASE_URL}/?s=${Search}&apikey=${API_KEY}` :
      `${API_BASE_URL}/?s=avengers&apikey=${API_KEY}`;
      const response = await fetch(endpoint);

if(!response.ok){
 throw new Error('Failed to fetch movies');
}

const data = await response.json();


if(data.Response === "False") {
  setErrorMessage(data.Error || 'failed to fetch movies');
  setMovieList([]);
  return;
}
setMovieList(data.Search || []);

if(Search && data.Search.length>0) {
  await updateSearchCount(Search, data.Search[0]);
}

  }catch(error){
    console.log(`Error fetching movies:${error}`);
    setErrorMessage('Error Fetching the Movie Please try again.')
  }finally{
    setIsLoading(false);
  }
}

const loadTrendingMovies = async()=>{
  try{
    const movies = await getTrendingMovies();
    setTrendingMovies(movies);

  }catch(error){
    console.log(error);
  }
}



useEffect(()=>{
  fetchMovies(debouncedSearchTerm);
},[debouncedSearchTerm]);

useEffect(()=>{
loadTrendingMovies();
} ,[])

  return (
    <>
    <main>
    <div className="pattern" />

    <div className="wrapper">
    <header>
      <img src="./hero.png" alt="hero banner" />
      <h1>Find <span className="text-gradient"> Movies</span> you'll enjoy!</h1>
    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
    </header>

{trendingMovies.length >0 && (
  <section className="trending">
    <h2>Trending Movies</h2>
    <ul>{trendingMovies.map((movie,index)=>(
      <li key={movie.$id}>
          <p>{index +1}</p>
          <img src={movie.poster_url} alt={movie.title}  />
      </li>
    ))}</ul>
  </section>
)}

<section className="all-movies" >
  <h2 >All Movies</h2>
  {isLoading ? (
    <Spinner />
  ): errorMessage ?(
     <p className="text-red-500">{errorMessage}</p>
    ) :(
      <ul>
        {movieList.map((movie,i)=>
        {
          return (
            <li       key={movie.imdbID || i}>
    
              <MovieCard movie={movie}  />
            </li>
        )
        })}
      </ul>
    )}
</section>
    </div>

    </main>
    </>
  )
}

export default App

