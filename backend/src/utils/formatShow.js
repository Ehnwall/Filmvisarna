export const formatShow = (shows) => {
    return shows.map((show) => {
        return {
            showId: show.showId,
            showTime: show.showTime,
            posterURL: show.posterUrl,
            genre: JSON.parse(show.description).genre,
            duration: show.durationMin,
            ageLimit: show.ageLimit,
            movieTitle: show.title,
            cinemaName: show.cinemaName,
        }
    })
}
