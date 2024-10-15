import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'filmvisarnabiograf@gmail.com',
        pass: 'ytng mntn ncll vcza',
    },
})

function sendBookingConfirm(confirmed, bookingNr, email) {
    let seatsHTML = confirmed[0].seats
        .map((seat) => {
            return `<p> Row: <strong>${seat.seatRow}</strong> & Number: <strong>${seat.seatNumber}</strong>.</p>`
        })
        .join('')

    let ticketTypes = confirmed[0].seats
        .map((tickets) => {
            return `<p> Tickets: <strong>${tickets.ticketType}</strong> & Pris: <strong>${tickets.ticketPrice}</strong>.</p>`
        })
        .join('')

    const mailOptions = {
        from: 'filmvisarnabiograf@gmail.com',
        to: 'filmvisarnabiograf@gmail.com',
        subject: 'Din boking är bekräftad från Filmvisarna',
        html: `
    <body style="height: 100%; width: 100%; background-color: #ebe9e4; color: #0D1B2A; display: flex; justify-content: center; align-items: center; text-align: center;">
        <div>
            <h1 style="color: #0D1B2A;">Filmvisarna</h1>
            <div>
                <h3>Din bokning är bekräftad. Ditt bokningsnummer är: <strong>${bookingNr}</strong>.</h3>

                 <div>
                 <p>Your seats are: </p>
                ${seatsHTML} 
                <p>Your tickets are: </p>
                ${ticketTypes}
            </div>
            
            <div>
            <p>AVBRYT DIN BOKNING NEDNA </P>
            <button style="background-color: #d49537; padding: 3px; color: #ebe9e4; "> Avboka </button>
            </div>
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
