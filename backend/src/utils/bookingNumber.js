const number = '0123456789'
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
function generateString(lengthchar, lengthNum) {
    let resultCarh = ''
    const charactersLength = characters.length
    for (let i = 0; i < lengthchar; i++) {
        resultCarh += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    let resultNum = ''
    const numberLength = number.length
    for (let i = 0; i < lengthNum; i++) {
        resultNum += number.charAt(Math.floor(Math.random() * numberLength))
    }
    const result = resultCarh + resultNum
    return result
}

export default { generateString }
