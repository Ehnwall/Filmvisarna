import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useGetSeats } from '../../utils/api/cinemas/useGetSeats'
import { CINEMASEATS, SHOWS } from '../../utils/types/types'
import { TICKETS } from '@/pages/booking'

export default function BookingSeats({ show, tickets }: { show: SHOWS; tickets: TICKETS }) {
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
    const [selectedRow, setSelectedRow] = useState<{ seatRow: number }[]>([])
    const [selectedSeats, setSelectedSeats] = useState<{ seatNumber: number }[]>([])

    const seatClicked = selectedSeats.length

    const handleSeatChange = (seatNumber: number, seatRow: number, isChecked: boolean) => {
        console.log(`selected seats! seatNumber: ${seatNumber} and SeatRow: ${seatRow} `)
        setSelectedSeats((prev) => {
            if (isChecked) {
                return [...prev, { seatNumber }]
            } else {
                return prev.filter((seat) => seat.seatNumber !== seatNumber)
            }
        })

        setSelectedRow((prev) => {
            if (isChecked) {
                return [...prev, { seatRow }]
            } else {
                return prev.filter((seat) => seat.seatRow !== seatRow)
            }
        })
    }

    useEffect(() => {
        const totalSeats = selectedSeats.map((seat, index) => {
            return { seat: seat, row: selectedRow[index] }
        })

        console.log(totalSeats)
    }, [selectedRow, selectedSeats])

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
                                onChange={(e) => handleSeatChange(seat.seatNumber, seat.seatRow, e.target.checked)}
                                disabled={isInactive && checkSelectedSeats}
                            />
                        )
                    })}
                </div>
            ))}
        </div>
    )
}
