import React from 'react'
import { useGetOneMovie } from '../../utils/api/movies/useGetOneMovie'

export function InfoMovieTrailer() {
    const { data: movie } = useGetOneMovie()
    return (
        <div className="ratio ratio-16x9">
            <iframe
                src={`https://www.youtube.com/embed/${movie?.trailerUrl}`}
                title={`${movie?.title} | Official Teaser Trailer`}
                allowFullScreen
            ></iframe>
        </div>
    )
}
