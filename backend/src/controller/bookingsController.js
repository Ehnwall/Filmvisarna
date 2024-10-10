import bookingsService from '../service/bookingsService.js'

const getAllTickets = (req, res) => {
    try {
        const ticket = bookingsService.getAllTickets()
        res.status(200).json(ticket)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export default { getAllTickets }
