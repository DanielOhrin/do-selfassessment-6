import { getAuthors, getCurrentTopic, getRecipients, getTopics, sendLetter, setTopic } from "./dataAccess.js"

export const Form = () => {
    return `<form id='main-form'>
        <div class="form-div">
            <label for="author">Author</label>
            <select name="author">
                <option value="" hidden>Choose Author...</option>
                ${authorsHTML()}
            </select>
        </div>
        <div class="form-div">
            <label for="letter">Letter</label>
            <textarea name="letter"></textarea> 
        </div>
        <div class="form-div">
            ${topicsHTML()}
        </div>
        <div class="form-div">
        <label for="recipient">Recipient</label>
            <select name="recipient">
                <option value="" hidden >Choose Recipient...</option>
                ${recipientsHTML()}
            </select>
        </div>
        <button type="button" id="send-btn">Send Letter</button>
    </form>`
}

const authorsHTML = () => {
    const authors = getAuthors()

    return authors.map(author => {
        return `<option value="${author.id}">${author.first_name} ${author.last_name}</option>`
    }).join("")
}

const topicsHTML = () => {
    const topics = getTopics()

    let html = `<h4 id="topic-h4">Topics</h4>
    <div id="topics">`

    html += topics.map(topic => {
        return `<input type="radio" name="topic" value="${topic.id}" />${topic.label}`
    }).join("")

    return html += `</div>`
}

const recipientsHTML = () => {
    const recipients = getRecipients()

    return recipients.map(recipient => {
        return `<option value="${recipient.id}">${recipient.first_name} ${recipient.last_name}</option>`
    }).join("")
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener(
    "change",
    event => {
        if (event.target.name === "topic") {
            setTopic(parseInt(event.target.value))
        }
    }
)

mainContainer.addEventListener(
    "click",
    event => {
        if (event.target.id === "send-btn") {
            const authorId = parseInt(document.querySelector(`select[name="author"]`).value)
            const topicId = getCurrentTopic()
            const recipientId = parseInt(document.querySelector(`select[name="recipient"]`).value)
            const description = document.querySelector(`textarea[name="letter"]`).value
            
            let date = new Date
            date = date.toLocaleString('en-GB', {timeZone: 'CST' }).split(",")
            date = date[0]

            const letterObj = {
                authorId: authorId,
                topicId: topicId,
                recipientId: recipientId,
                description: description,
                date: date
            }

            if (!isNaN(authorId) && !isNaN(topicId) && !isNaN(recipientId) && description && authorId !== recipientId) {
                sendLetter(letterObj)
            } else if (authorId === recipientId) {
                window.alert("You cannot send a letter to yourself.")
            } else {
                window.alert("Please fill out the entire form.")
            }
        }
    }
)