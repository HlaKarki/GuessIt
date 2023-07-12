import './alert_message.css'

const AlertMessage = (message_title, description) => {
    // fade out the background
    const modalBackdrop = document.getElementById("modal-backdrop");
    modalBackdrop.classList.remove("hidden");

    const body = document.querySelector("body");
    const message = document.createElement("div");
    message.classList.add('alert_message-message');
    message.textContent = message_title;

    // Create a new div element for the buttons
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("alert_message-buttons")

    const noButton = document.createElement("button");
    noButton.classList.add('no-button')
    noButton.textContent = "No";

    // Create two new button elements
    const okayButton = document.createElement("button");
    okayButton.classList.add('okay-button')
    okayButton.textContent = "Okay";

    // Append the buttons to the buttonsDiv element
    buttonsDiv.appendChild(noButton);
    buttonsDiv.appendChild(okayButton);

    // Append the buttons to the message element
    message.appendChild(buttonsDiv);
    message.classList.add("fade-in-animation");

    // Add the message element to the body
    body.appendChild(message);
}

export default AlertMessage