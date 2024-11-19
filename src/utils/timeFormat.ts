const weekDaysMap: { [key: string]: string } = {
    '0': 'Söndag',
    '1': 'Måndag',
    '2': 'Tisdag',
    '3': 'Onsdag',
    '4': 'Torsdag',
    '5': 'Fredag',
    '6': 'Lördag',
}
const getWeekDay = (date: Date) => {
    return weekDaysMap[date.getDay()]
}
const getShortNumericDate = (date: Date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const fullDate = `${month}/${day}`
    return fullDate
}
const getShortDate = (date: Date) => {
    const month = date.toLocaleDateString('sv-SE', { month: 'short' })
    const day = date.getDate()
    const fullDate = `${day} ${month}`
    return fullDate.split('.')[0]
}
const getTime = (date: Date) => {
    const time = date.getHours().toString().padStart(2, '0')
    const min = date.getMinutes().toString().padStart(2, '0')
    const fullTime = `${time}:${min}`
    return fullTime
}
const getWeekdayWithDate = (date: Date) => {
    return `${getWeekDay(date)} ${getShortDate(date)}`
}

const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

export const getDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return {
        hours,
        minutes: remainingMinutes,
    }
}
export const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return {
        getWeekDay: getWeekDay(date),
        getShortNumericDate: getShortNumericDate(date),
        getShortDate: getShortDate(date),
        getTime: getTime(date),
        getWeekdayWithDate: getWeekdayWithDate(date),
        getWeekNumber: getWeekNumber(date),
    }
}
