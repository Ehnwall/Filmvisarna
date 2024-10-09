import service from '../service/showsService.js'

const getAllShowsController = (req, res) => {
    try {
        const shows = service.getAllShows()
        res.status(200).send(shows)
    } catch (e) {
        res.status(404).send({ msg: e.messaqe })
    }
}

export default { getAllShowsController }
