import React from 'react'
import { Form } from 'react-bootstrap'
import { useGetSeats } from '../../utils/api/cinemas/useGetSeats'

export default function BookingSeats() {
    const { data: seats } = useGetSeats()
    const rowSizes = [8, 9, 10, 10, 10, 10, 12, 13]
    const seatArray = rowSizes.map(
        (size) => new Array(size).fill(null).map(() => ({ booked: Math.random() < 0.3 })) // Randomly mark some seats as booked
    )
    return (
        <div className="seat-picker__container bg-body-tertiary py-5 rounded">
            <div className="mx-auto bg-light pb-4 mb-5 rounded-5 w-50 "></div>
            {seatArray.map((row, rowIndex) => (
                <div key={rowIndex} className="seat-row">
                    {row.map((seat, seatIndex) => (
                        <Form.Check key={seatIndex} type="checkbox" disabled={seat.booked} />
                    ))}
                </div>
            ))}
        </div>
    )
}
