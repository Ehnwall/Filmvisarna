import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useGetSeats } from '../../utils/api/cinemas/useGetSeats'
import { CINEMASEATS, SHOWS, TICKETAMOUNT } from '../../utils/types/types'

export default function BookingSeats({ show, tickets }: { show: SHOWS; tickets: TICKETAMOUNT[] }) {
    const [seatIdArray, setSeatIdArray] = useState<number[]>([])
    const cinemaId = show.cinemaId

    const result = tickets.reduce((acc, obj) => acc + obj.amount, 0)

    const { data: seats = [] } = useGetSeats(cinemaId)

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

    useEffect(() => {
        const thisIsTheOne = toReqBody.filter((item) => item.ticketId !== undefined)

        if (seatIdArray.length > thisIsTheOne.length) {
            setSeatIdArray((seats) => {
                return seats.slice(0, -1)
            })
        }
    }, [toReqBody])

    console.log('hejhej', toReqBody)

    return (
        <div className="seat-picker__container bg-body-tertiary py-5 rounded">
            <div className="mx-auto bg-light pb-4 mb-5 rounded-5 w-50"></div>
            {Object.entries(seatsByRow).map(([row, seatsInRow]) => (
                <div key={row} className="seat-row g-3">
                    {seatsInRow.map((seat) => {
                        const isSeatSelected = seatIdArray.includes(seat.Id)
                        const isInactive = seatClicked >= result && !isSeatSelected

                        return (
                            <Form.Check
                                key={seat.Id}
                                type="checkbox"
                                className={isInactive ? 'inactive' : ''}
                                onChange={(e) => handleSeatChange(e.target.checked, seat.Id)}
                                checked={isSeatSelected}
                                disabled={isInactive}
                            />
                        )
                    })}
                </div>
            ))}
        </div>
    )
}
