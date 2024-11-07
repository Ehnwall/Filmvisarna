import showService from '../service/showsService.js'

const postOneShowController = (req, res) => {
    const { movieId, cinemaId, time } = req.body

    if (!movieId || !cinemaId || !time) {
        return res.status(400).json({ error: 'Missing required fields' })
    }

    try {
        const result = showsController.addShow(movieId, cinemaId, time)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getShowById = (req, res) => {
    const id = parseInt(req.params.id)

    try {
        const show = showService.getShowById(id)
        res.status(200).send(show)
    } catch (error) {
        res.status(404).send({ msg: error.message })
    }
}

const getAllShowsController = (req, res) => {
    const { startDate, endDate } = req.query
    try {
        const start = startDate ? new Date(startDate).toISOString() : null
        const end = endDate ? new Date(endDate).toISOString() : null
        const shows = showService.getAllShows(start, end)
        res.status(200).send(shows)
    } catch (e) {
        if (e.message === 'No shows found') {
            res.status(404).send({ msg: e.message })
        } else {
            res.status(400).send({ msg: e.message })
        }
    }
}

const getSeats = (req, res) => {
    const showId = req.params.Id

    try {
        const seatsCheck = showService.getSeatStatus(showId)
        res.status(200).send({ occupiedSeats: seatsCheck })
    } catch (e) {
        res.status(404).send({ msg: e.message })
    }
}

export default { postOneShowController, getAllShowsController, getSeats, getShowById }
