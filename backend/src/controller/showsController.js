import showService from '../service/showsService.js'

const getShowById = (req, res) => {
    const id = parseInt(req.params.id)

    try {
        const show = showService.getShowById(id)
        res.status(200).send(show)
    } catch (error) {
        res.status(404).send({ msg: error.message })
    }
}

const getAllShowsController = (req, res) => {
    const { startDate, endDate } = req.query
    try {
        const start = startDate ? new Date(startDate).toISOString() : null
        const end = endDate ? new Date(endDate).toISOString() : null
        const shows = showService.getAllShows(start, end)
        res.status(200).send(shows)
    } catch (e) {
        if (e.message === 'No shows found') {
            res.status(404).send({ msg: e.message })
        } else {
            res.status(400).send({ msg: e.message })
        }
    }
}

const getSeats = (req, res) => {
    const showId = req.params.Id

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    const sendSeatsStatus = () => {
        try {
            const seatsCheck = showService.getSeatStatus(showId)
            res.write(`data: ${JSON.stringify({ occupiedSeats: seatsCheck })}\n\n`)
        } catch (e) {
            res.write(`event: error\ndata: ${JSON.stringify({ msg: e.message })}\n\n`)
        }
    }
    res.write(': welcome\n\n')
    sendSeatsStatus()

    const intervalId = setInterval(sendSeatsStatus, 5000)

    req.on('close', () => {
        clearInterval(intervalId)
        res.end()
    })
}

export default { getAllShowsController, getSeats, getShowById }
