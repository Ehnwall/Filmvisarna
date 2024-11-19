export const signupGuest = ({ email, firstName, lastName }) => {
    const emailRegex = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$', 'g')

    if (!email || !firstName || !lastName) {
        throw new Error('Alla fält är obligatoriska')
    }

    if (!email.trim() || !firstName.trim() || !lastName.trim()) {
        throw new Error('Alla fält är obligatoriska')
    }

    if (!emailRegex.test(email)) {
        throw new Error('Ogiltig e-postadress')
    }

    if (email.length > 255) {
        throw new Error('E-postadressen är för lång')
    }

    if (firstName.length > 50) {
        throw new Error('Förnamnet är för långt')
    }

    if (lastName.length > 50) {
        throw new Error('Efternamnet är för långt')
    }
}
export const signupData = ({ email, firstName, lastName, password }) => {
    const emailRegex = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$', 'g')
    const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$', 'g')

    if (!email || !firstName || !lastName || !password) {
        throw new Error('Alla fält är obligatoriska')
    }

    if (!email.trim() || !firstName.trim() || !lastName.trim() || !password) {
        throw new Error('Alla fält är obligatoriska')
    }

    if (!emailRegex.test(email)) {
        throw new Error('Ogiltig e-postadress')
    }

    if (!passwordRegex.test(password)) {
        throw new Error('Lösenordet måste innehålla minst 8 tecken, en stor bokstav, en liten bokstav och en siffra')
    }

    if (password.length > 128) {
        throw new Error('Lösenordet är för långt')
    }

    if (firstName.length > 50) {
        throw new Error('Förnamnet är för långt')
    }

    if (lastName.length > 50) {
        throw new Error('Efternamnet är för långt')
    }
}

const signinData = ({ email, password }) => {
    if (!email || !password) {
        throw new Error('Alla fält är obligatoriska')
    }
}
export default { signupData, signinData, signupGuest }
