import service from '../service/cinemasService.js'

const getSeatsController = (req, res) => {
    try {
        const seatsCheck = service.getSeatStatus()
        res.status(200).send(seatsCheck)
    } catch (e) {
        res.status(404).send({ msg: e.message })
    }
}

export default getSeatsController
