export const signupData = ({ email, firstName, lastName, password }) => {
    const emailRegex = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$', 'g')
    const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$', 'g')

    if (!email || !firstName || !lastName || !password) {
        throw new Error('All fields are required')
    }

    if (!email.trim() || !firstName.trim() || !lastName.trim() || !password) {
        throw new Error('All fields are required')
    }

    if (!emailRegex.test(email)) {
        throw new Error('Invalid email')
    }

    if (!passwordRegex.test(password)) {
        throw new Error('Password must contain at least 8 characters, one lowercase, one uppercase and one number')
    }

    if (password.length > 128) {
        throw new Error('Password is too long')
    }
}
export default { signupData }
