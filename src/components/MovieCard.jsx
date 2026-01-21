import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"
import { useEffect, useState } from "react";
import { getMovieDetails } from "../services/api";


function MovieCard({movie}){

    const [runtime, setRuntime] = useState(null);

    useEffect(() => {
        async function fetchRuntime() {
            const details = await getMovieDetails(movie.id);
            setRuntime(details.runtime);
        }

        fetchRuntime();
    }, [movie.id]);

    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e){
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
            else addToFavorites(movie)
    }

    return <div className="movie-card">
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt ={movie.title} />
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ❤︎⁠
                </button>
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.split("-")[0]}</p>

            <p className="movie-desc">
                {movie.overview || "No description available."}
            </p>

            <p className="movie-runtime">
                ⏱ {runtime ? `${runtime} min` : "Loading..."}
            </p>

            <p className="movie-rating">
                ⭐ {movie.vote_average?.toFixed(1) ?? "N/A"} / 10
            </p>
            </div>
        </div>
}

export default MovieCard