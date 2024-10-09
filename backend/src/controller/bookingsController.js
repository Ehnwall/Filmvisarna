import bookingsService from '../service/bookingsService.js'

const getTicketsById = (req, res) => {
    const id = parseInt(req.params.id)
    console.log(id)
    const ticket = bookingsService.getTicketsById(id)

    if (!ticket) {
        return res.status(404).send({ msg: 'Ticket not found' })
    }

    res.status(200).send(ticket)
}

export default { getTicketsById }
