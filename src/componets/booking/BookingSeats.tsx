import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useGetSeats } from '../../utils/api/cinemas/useGetSeats'
import { CINEMASEATS, SHOWS } from '../../utils/types/types'
import { TICKETS } from '../../pages/booking'

export default function BookingSeats({ show, tickets }: { show: SHOWS; tickets: TICKETS }) {
    const [seatIdArray, setSeatIdArray] = useState<number[]>([])
    const [selectedSeats, setSelectedSeats] = useState<{ seatNumber: number }[]>([])

    const cinemaId = show.cinemaId

    const result = tickets.reduce(function (acc, obj) {
        return acc + obj.amount
    }, 0)

    const { data: seats = [] } = useGetSeats(cinemaId)

    const seatsByRow = seats.reduce((row: Record<number, CINEMASEATS[]>, seat: CINEMASEATS) => {
        if (row[seat.seatRow]) {
            row[seat.seatRow].push(seat)
        } else {
            row[seat.seatRow] = [seat]
        }
        return row
    }, {})

    const seatClicked = selectedSeats.length

    const handleSeatChange = (seatNumber: number, isChecked: boolean, seatId: number) => {
        console.log(`selected seats! seatNumber: ${seatId}`)
        setSelectedSeats((prev) => {
            if (isChecked) {
                return [...prev, { seatNumber }]
            } else {
                return prev.filter((seat) => seat.seatNumber !== seatNumber)
            }
        })

        setSeatIdArray((prev) => {
            if (isChecked) {
                return [...prev, seatId]
            } else {
                return prev.filter((seat) => seatId !== seatId)
            }
        })
    }

    let ticketsCopy = JSON.parse(JSON.stringify(tickets))
    let toReqBody = []

    for (let seatId of seatIdArray) {
        let obj = { seatId }
        for (let ticket of ticketsCopy) {
            if (ticket.amount > 0) {
                obj.ticketId = ticket.ticketId
                ticket.amount--
                break
            }
        }
        toReqBody.push(obj)
    }
    console.log(toReqBody)

    return (
        <div className="seat-picker__container bg-body-tertiary py-5 rounded">
            <div className="mx-auto bg-light pb-4 mb-5 rounded-5 w-50 "></div>
            {Object.entries(seatsByRow).map(([row, seatsInRow]) => (
                <div key={row} className="seat-row g-3">
                    {seatsInRow.map((seat) => {
                        const checkSelectedSeats = !selectedSeats.some(
                            (selected) => selected.seatNumber === seat.seatNumber
                        )
                        const isInactive = seatClicked >= result && checkSelectedSeats
                        return (
                            <Form.Check
                                key={seat.seatNumber}
                                type="checkbox"
                                className={isInactive ? 'inactive' : ''}
                                onChange={(e) => handleSeatChange(seat.seatNumber, e.target.checked, seat.Id)}
                                disabled={isInactive && checkSelectedSeats}
                            />
                        )
                    })}
                </div>
            ))}
        </div>
    )
}
