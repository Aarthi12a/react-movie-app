import React from 'react'
import './MovieCard.css'
const MovieCard = ({movie:{Title,Poster,Type,Year}}) => {
  //console.log(Poster);
  return (
    <div className="movie-card">
        <img src={Poster!=="N/A" ? Poster :"/no-movie.png" } alt={Title}/>
        
        <div className="mt-4 text-white">
            <h3>{Title}</h3>

         <div className="content">
            <div className="rating">
                <img src="./star.svg" alt="star" className="star-icon" />
                <span> . </span>
                <p> {Year ? Year :"doesn't exist"}</p>
            </div>
            <span> . </span>
            <p className="type">{Type ? Type : N/A}</p>
             </div>
        </div>
    </div>
  )
}

export default MovieCard