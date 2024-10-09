import cinemasService from '../service/cinemasService.js'

const getSeatsByCinemaId = (req, res) => {
    const { id } = req.params
    if (isNaN(id)) {
        return res.status(400).send({ msg: 'Invalid id' })
    }
    try {
        const result = cinemasService.seatsByCinemaId(id)
        return res.send(result)
    } catch (e) {
        return res.status(500).send({ msg: e.message })
    }
}

export default { getSeatsByCinemaId }
