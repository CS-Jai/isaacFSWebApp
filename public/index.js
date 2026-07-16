const socket = io();

const links = document.querySelectorAll(".listenerOptions a");

var currentUserListeners = []

links.forEach((link) => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        if(link.classList.contains("selectedNumber")){
            link.classList.remove("selectedNumber");
            currentUserListeners = currentUserListeners.filter(number => number !== link.textContent);

            miniConsoleAdd("<p>User 1 REMOVED a listener for " + link.textContent + "</p>");
        }else{
            link.classList.add("selectedNumber");
            currentUserListeners.push(link.textContent);

            miniConsoleAdd("<p>User 1 ADDED a listener for " + link.textContent + "</p>");
        }

    });
});

var numberRolledOptions = document.querySelectorAll(".rolledOptions a");

numberRolledOptions.forEach((numRolled) => {
    numRolled.addEventListener("click", function (event) {
        event.preventDefault();

        socket.emit("diceRolled", numRolled.textContent);
    });
});

const clearAllButton = document.getElementById('clearAll');

clearAllButton.addEventListener("click", function (event) {
    event.preventDefault();
    $(".alertMessages").html("");
});

const alertMessages = document.querySelector(".alertMessages");

alertMessages.addEventListener("click", function (event) {
    const clearButton = event.target.closest(".clearOne");

    if (!clearButton) return;

    event.preventDefault();
    clearButton.closest("p").remove();
});


function miniConsoleAdd(input){
    $(".consoleThingy").append(input);

    const consoleBox = document.querySelector(".consoleThingy");
    consoleBox.scrollTop = consoleBox.scrollHeight;
}

function playerAlertAdd(input){
    $(".alertMessages").append(input);

    const alertBox = document.querySelector(".alertMessages");
    alertBox.scrollTop = alertBox.scrollHeight;
}




socket.on("connect", () => {
    console.log("Connected to server:", socket.id);

    socket.emit("testMessage", "Hello from the browser!");
});

socket.on("diceRolled", (number) => {
    console.log("Someone rolled:", number);

    if(currentUserListeners.includes(number)){
        miniConsoleAdd("<p>User 1's listener for " + number + " was activated</p>");
        playerAlertAdd("<p>Your listener for " + number + " was activated <a href='#' class='clearOne'>X</a> </p>")
    }
});