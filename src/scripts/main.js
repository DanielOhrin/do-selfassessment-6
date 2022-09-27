import { fetchAuthors, fetchTopics, fetchRecipients, fetchLetters } from "./dataAccess.js"
import { PenPal } from "./PenPal.js"

const mainContainer = document.querySelector("#container")

const renderHTML = () => {
    return fetchAuthors()
        .then(() => fetchTopics())
        .then(() => fetchRecipients())
        .then(() => fetchLetters())
        .then(
            () => {
                mainContainer.innerHTML = PenPal()
            }
        )
        .then(
            () => {
                // Makes my letters max-width the same as my form's current width.
                document.getElementById("letters").style.width = document.getElementById("main-form").style.width
            }
        )
}

renderHTML()

mainContainer.addEventListener(
    "stateChanged",
    event => {
        renderHTML()
    }
)

