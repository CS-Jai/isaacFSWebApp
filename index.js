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

        if(currentUserListeners.includes(numRolled.textContent)){
            miniConsoleAdd("<p>User 1's listener for " + numRolled.textContent + " was activated</p>");
        }
    });
});

function miniConsoleAdd(input){
    $(".consoleThingy").append(input);

    const consoleBox = document.querySelector(".consoleThingy");
    consoleBox.scrollTop = consoleBox.scrollHeight;
}
