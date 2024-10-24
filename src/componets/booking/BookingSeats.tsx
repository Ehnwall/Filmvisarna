import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useGetSeats } from '../../utils/api/cinemas/useGetSeats'
import { CINEMASEATS, SHOWS } from '../../utils/types/types'

export default function BookingSeats({ show }: { show: SHOWS }) {
    const cinemaId = show.cinemaId

    const { data: seats = [] } = useGetSeats(cinemaId)

    const seatsByRow = seats.reduce((row: Record<number, CINEMASEATS[]>, seat: CINEMASEATS) => {
        if (row[seat.seatRow]) {
            row[seat.seatRow].push(seat)
        } else {
            row[seat.seatRow] = [seat]
        }
        return row
    }, {})

    const handleSeatChange = (seatNumber: number, seatRow: number) => {
        console.log(`Clicked on seat: ${seatNumber} and row ${seatRow}`)
    }
    return (
        <div className="seat-picker__container bg-body-tertiary py-5 rounded">
            <div className="mx-auto bg-light pb-4 mb-5 rounded-5 w-50 "></div>
            {Object.entries(seatsByRow).map(([row, seatsInRow]) => (
                <div key={row} className="seat-row g-3">
                    {seatsInRow.map((seat) => (
                        <Form.Check
                            key={seat.seatNumber}
                            type="checkbox"
                            onChange={() => handleSeatChange(seat.seatNumber, seat.seatRow)}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}
