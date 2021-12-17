export const generateID = () => {
    const randomNumber = Math.random().toString(36).substring(2)
    const randomDate = Date.now().toString(36)
    return randomNumber + randomDate
}

export const formatDate = ( date ) => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return new Date(date).toLocaleDateString('es-ES', options)
}