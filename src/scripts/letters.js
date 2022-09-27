import { getLetters, getAuthors, getRecipients, getTopics } from "./dataAccess.js"

export const Letters = () => {
    const letters = getLetters()
    const topics = getTopics()
    
    let html = `<h3>Letters</h3>`
    
    return html += letters.map(letter => {
        return `<div class="letter-div">
            <h5>Dear ${recipientName(letter.recipientId)},</h5>
            
            <p id="description-p">${letter.description}</p>
            
            <h5>Sincerely, ${authorName(letter.authorId)}</h5>
        
            <p class="date-p">Sent on ${letter.date}</p>
            <div class="tag-div">
                <p>${topics.find(topic => topic.id === letter.topicId).label}</p>
            </div>
        </div>`
    }).join("")
}

const recipientName = (id) => {
    const recipients = getRecipients()
    
    const matchingRecipient = recipients.find(recipient => recipient.id === id)
    
    return `${matchingRecipient.first_name} ${matchingRecipient.last_name} (${matchingRecipient.email})`
}

const authorName = (id) => {
    const authors = getAuthors()
    
    const matchingAuthor = authors.find(author => author.id === id)
    
    return `${matchingAuthor.first_name} ${matchingAuthor.last_name} (${matchingAuthor.email})`
}
