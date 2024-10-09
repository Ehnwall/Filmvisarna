import bookingsService from '../service/bookingsService.js'

const getShowById = (req, res) => {
    const id = parseInt(req.params.id)
    console.log(id)
    const show = bookingsService.getShowById(id)

    if (!show) {
        return res.status(404).send({ msg: 'Show not found' })
    }

    res.status(200).send(show)
}
export default { getShowById }
