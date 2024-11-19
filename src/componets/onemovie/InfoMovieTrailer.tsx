import React from 'react'
import { MOVIE } from '@/utils/types/types'
export function InfoMovieTrailer({ movie }: Readonly<{ movie: MOVIE }>) {
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
