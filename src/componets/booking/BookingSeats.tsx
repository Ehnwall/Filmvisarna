import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { CINEMASEATS, OCCUPIEDSEATS, TICKETAMOUNT } from '../../utils/types/types'

export function BookingSeats({
    occupiedSeats,
    seats,
    tickets,
    onSeatsSelected,
}: {
    occupiedSeats: OCCUPIEDSEATS
    seats: CINEMASEATS[]
    tickets: TICKETAMOUNT[]
    onSeatsSelected: (seats: any[]) => void
}) {
    const [seatIdArray, setSeatIdArray] = useState<number[]>([])

    const result = tickets.reduce((acc, obj) => acc + obj.amount, 0)

    const seatsByRow = seats.reduce((row: Record<number, CINEMASEATS[]>, seat: CINEMASEATS) => {
        if (row[seat.seatRow]) {
            row[seat.seatRow].push(seat)
        } else {
            row[seat.seatRow] = [seat]
        }
        return row
    }, {})

    const seatClicked = seatIdArray.length

    const handleSeatChange = (isChecked: boolean, seatId: number) => {
        setSeatIdArray((prev) => {
            if (isChecked) {
                return [...prev, seatId]
            } else {
                return prev.filter((seat) => seat !== seatId)
            }
        })
    }

    useEffect(() => {
        let ticketsCopy = JSON.parse(JSON.stringify(tickets))
        let newSeatsSelected = []

        for (let seatId of seatIdArray) {
            let obj = { seatId }
            for (let ticket of ticketsCopy) {
                if (ticket.amount > 0) {
                    obj.ticketTypeId = ticket.ticketId
                    ticket.amount--
                    break
                }
            }
            newSeatsSelected.push(obj)
        }

        const validSeats = newSeatsSelected.filter((item) => item.ticketTypeId !== undefined)

        if (validSeats.length < seatIdArray.length) {
            setSeatIdArray((prev) => prev.slice(0, -1))
        } else {
            onSeatsSelected(validSeats)
        }
    }, [seatIdArray, tickets])

    return (
        <div className="seat-picker rounded-3 overflow-auto my-5">
            <div className="seat-picker__container bg-body-tertiary py-5 rounded">
                <div className="mx-auto bg-light pb-4 mb-5 rounded-5 w-50"></div>
                {Object.entries(seatsByRow).map(([row, seatsInRow]) => (
                    <div key={row} className="seat-row g-3">
                        {seatsInRow.map((seat) => {
                            const isSeatSelected = seatIdArray.includes(seat.Id)
                            const isInactive = seatClicked >= result && !isSeatSelected
                            const isOccopied = occupiedSeats?.occupiedSeats.includes(seat.Id)

                            return (
                                <Form.Check
                                    key={seat.Id}
                                    type="checkbox"
                                    className={`${isInactive ? 'inactive' : ''} ${
                                        isOccopied ? 'occupied inactive' : ''
                                    }`}
                                    onChange={(e) => handleSeatChange(e.target.checked, seat.Id)}
                                    checked={isSeatSelected}
                                    disabled={isInactive || isOccopied}
                                />
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}
