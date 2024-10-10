import bookingsService from '../service/bookingsService.js'

const getAllTickets = (req, res) => {
    const ticket = bookingsService.getAllTickets()
    if (!ticket) {
        return res.status(404).send({ msg: 'Ticket not found' })
    }

    res.status(200).send(ticket)
}

export default { getAllTickets }
