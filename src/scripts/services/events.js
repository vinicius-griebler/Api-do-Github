import { baseUrl } from '../variables.js'

async function getEvents(userName) {
    const response = await fetch(`${baseUrl}/${userName}/events`)
    const events = await response.json()

    const filteredEvents = events.filter(event =>
        event.type === 'PushEvent' || event.type === 'CreateEvent'
    ).slice(0, 10)

    return filteredEvents
}

export { getEvents }