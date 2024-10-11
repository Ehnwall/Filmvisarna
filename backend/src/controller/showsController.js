import service from '../service/showsService.js'

const getShowById = (req, res) => {
    const id = parseInt(req.params.id)

    try {
        const show = service.getShowById(id)
        res.status(200).send(show)
    } catch (error) {
        res.status(404).send({ msg: error.message })
    }
}

const getAllShowsController = (req, res) => {
    try {
        const shows = service.getAllShows()
        res.status(200).send(shows)
    } catch (e) {
        res.status(404).send({ msg: e.message })
    }
}

export default { getAllShowsController, getShowById }

