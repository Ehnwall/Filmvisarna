import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const emailAdress = process.env.EMAIL_ADRESS_SECRET
const appKey = process.env.SECRET_KEY_PASSWORD

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: emailAdress,
        pass: appKey,
    },
})

function sendBookingConfirm(confirmed, bookingNr, email) {
    let seatsHTML = confirmed[0].seats
        .map((seat) => {
            return `<p> Row: <strong>${seat.seatRow}</strong> & Number: <strong>${seat.seatNumber}</strong>.</p>`
        })
        .join('')
    let totalPrice = 0
    let ticketTypes = confirmed[0].seats
        .map((tickets) => {
            totalPrice += parseFloat(tickets.ticketPrice)
            return `<p> Tickets: <strong>${tickets.ticketType}</strong> & Pris: <strong>${tickets.ticketPrice}</strong>.</p>`
        })
        .join('')

    const mailOptions = {
        from: emailAdress,
        to: 'filmvisarnabiograf@gmail.com',
        subject: 'Din boking är bekräftad från Filmvisarna',
        html: `
    <body style="height: 100%; width: 100%; background-color: #0D1B2A; color: #ebe9e4; display: flex; justify-content: center; align-items: center; text-align: center;">
        <div>
            <h1 style="color: #ebe9e4;">Filmvisarna</h1>
            <div>
                <h3>Din bokning är bekräftad. Ditt bokningsnummer är: <strong>${bookingNr}</strong>.</h3>
            </div>
            <div>
                <p>Email: <strong>${confirmed[0].userEmail}</strong></p>
                <p>Name: <strong>${confirmed[0].userFirstname}</strong> <strong>${
            confirmed[0].userLastname
        }</strong></p>
                <p>Film: <strong>${confirmed[0].movieTitle}</strong></p>
                <p>Salong: <strong>${confirmed[0].cinemaName}</strong></p>
                <p>Show tid: <strong>${confirmed[0].showTime}</strong></p>
                <p>Your seats are:</p>
                ${seatsHTML}
                <p>Your tickets are:</p>
                ${ticketTypes}
                <p>Totalpris: <strong>${totalPrice.toFixed(2)}</strong> SEK</p>
            </div>
            <div style="margin-bottom: 10px;" >
                <p>AVBRYT DIN BOKNING NEDAN</p>
                <button style="background-color: #d49537; padding-inline: 10px; border: none; color: #ebe9e4;">Avboka</button>
            </div>
        </div>
    </body>
    `,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred:', error)
        } else {
            console.log(`Email sent successfully to: ${email}`, info.response)
        }
    })
}

export default { sendBookingConfirm }
