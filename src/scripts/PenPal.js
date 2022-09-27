import { Form } from "./form.js"
import { Letters } from "./letters.js"

export const PenPal = () => {
    return `<h2>Pen Pal Society</h2>
    ${ Form() }
    <section id="letters">
        ${ Letters() }
    </section>`
}