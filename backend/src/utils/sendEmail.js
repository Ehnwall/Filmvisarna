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

export default transporter
