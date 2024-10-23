import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useGetSeats } from '../../utils/api/cinemas/useGetSeats'
import { CINEMASEATS } from '../../utils/types/types'

export default function BookingSeats() {
    const { data: seats = [] } = useGetSeats()

    const seatsByRow = seats.reduce((acc: Record<number, CINEMASEATS[]>, seat: CINEMASEATS) => {
        if (acc[seat.seatRow]) {
            acc[seat.seatRow].push(seat)
        } else {
            acc[seat.seatRow] = [seat]
        }
        return acc
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
