export default function StartPageRender() {
    return <></>
}

/*

const convertDuration = (duration: number) => {
    const hours = Math.floor(duration / 60)
    const minutes = duration % 60

    return { hours, minutes }
}

const AllMoviesList: React.FC = () => {
    const { data, error, isLoading } = useQuery<MOVIE[], Error>(QUERY_KEY, fetchMovies)

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    if (!data || data.length === 0) {
        return <div>No movies available.</div>
    }

    return <></>
}

export default AllMoviesList
*/
