import showService from '../service/showsService.js'

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
    try {
        const shows = showService.getAllShows()
        res.status(200).send(shows)
    } catch (e) {
        res.status(404).send({ msg: e.message })
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

export default { getAllShowsController, getSeats, getShowById }
