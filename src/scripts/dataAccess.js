const applicationState = {
    authors: [],
    topics: [],
    recipients: [],
    letters: []
}

const mainContainer = document.querySelector("#container")
const API = `http://localhost:8088`

export const fetchAuthors = () => {
    return fetch(`${API}/authors`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.authors = [...data]
            }
        )
}

export const fetchTopics = () => {
    return fetch(`${API}/topics`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.topics = [...data]
            }
        )
}

export const fetchRecipients = () => {
    return fetch(`${API}/recipients`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.recipients = [...data]
            }
        )
}

export const fetchLetters = () => {
    return fetch(`${API}/letters`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.letters = [...data]
            }
        )
}

export const sendLetter = (letterObj) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(letterObj)
    }

    return fetch(`${API}/letters`, fetchOptions)
        .then(mainContainer.dispatchEvent(new CustomEvent("stateChanged")))
}

export const getAuthors = () => {
    return applicationState.authors.map(pal => ({ ...pal }))
}

export const getTopics = () => {
    return applicationState.topics.map(topic => ({ ...topic }))
}

export const getRecipients = () => {
    return applicationState.recipients.map(recipient => ({ ...recipient }))
}

export const getCurrentTopic = () => {
    return applicationState.topicId
}

export const getLetters = () => {
    return applicationState.letters.map(letter => ({ ...letter }))
}

export const setTopic = (id) => {
    applicationState.topicId = id
} 