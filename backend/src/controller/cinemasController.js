import service from '../service/cinemasService.js'

const getSeatsController = (req, res) => {
    const showId = req.params.Id
    const cinemaId = req.query.cinemaId

    try {
        const seatsCheck = service.getSeatStatus(showId, cinemaId)
        res.status(200).send(seatsCheck)
    } catch (e) {
        res.status(404).send({ msg: e.message })
    }
}

export default getSeatsController
