function sendMessage() {

    var userInput = document.getElementById("user-input").value;

    var chatMessages = document.getElementById("chat-messages");



    // Display user message

    var userMessageElement = document.createElement("div");

    userMessageElement.className = "user-message";

    userMessageElement.textContent = userInput;

    chatMessages.appendChild(userMessageElement);



    // Clear user input

    document.getElementById("user-input").value = "";



    // Send user message to Rasa

    fetch("https://e7e3-2402-800-61cf-5d8a-759c-bb3-45f8-87ec.ngrok-free.app/webhooks/rest/webhook", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            "sender": "user",

            "message": userInput

        })

    })

    .then(response => response.json())

    .then(data => {

        // Display bot response

        var botResponse = data[0].text;

        var botMessageElement = document.createElement("div");

        botMessageElement.className = "bot-message";

        botMessageElement.textContent = botResponse;

        chatMessages.appendChild(botMessageElement);

    })

    .catch(error => console.error("Error:", error));

}

function handleKeyPress(event) {

    if (event.key === "Enter") {

        sendMessage(); // Call sendMessage function when Enter key is pressed

    }

}


document.getElementById('user-input').addEventListener('input', function() {
    var popup = document.getElementById('chat-popup');
    if (this.value.length > 0) {
        popup.style.display = 'block';
    } else {
        popup.style.display = 'none';
    }
});

function chooseSuggestion(suggestion) {
    var input = document.getElementById('user-input');
    input.value = suggestion; // Set the input field to the suggestion
    closePopup(); // Close the popup
}

function closePopup() {
    document.getElementById('chat-popup').style.display = 'none';
}
