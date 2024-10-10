import showsService from '../service/showsService.js'

const getShowById = (req, res) => {
    const id = parseInt(req.params.id)

    try {
        const show = showsService.getShowById(id)
        res.status(200).send(show)
    } catch (error) {
        res.status(404).send({ msg: error.message })
    }
}
export default { getShowById }
