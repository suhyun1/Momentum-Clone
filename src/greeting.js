const clockContainer = document.querySelector('.js-clock'),
clockTitle = clockContainer.querySelector('h1');

const userForm = document.querySelector('.js-userForm'),
    nameInput = userForm.querySelector('input'),
    greeting = document.querySelector('.js-greetings');

const USER_LS = "currentUser",
    SHWOING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
    
}
function handleNameSubmit(event){
    event.preventDefault();
    const currentValue = nameInput.value;
    displayGreeting(currentValue);
    saveName(currentValue);
}
function askUserName(){
    userForm.classList.add(SHWOING_CN);
    userForm.addEventListener("submit", handleNameSubmit);
}
function displayGreeting(text){
    userForm.classList.remove(SHWOING_CN);
    greeting.classList.add(SHWOING_CN);
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 0  && hours < 6){
        greeting.innerText = `Good Night, ${text}`;
    } else if (hours >= 6 && hours < 12) {
        greeting.innerText = `Good Morning, ${text}`;
    } else if (hours >= 12 && hours < 18) {
        greeting.innerText = `Good Afternoon, ${text}`;
    } else if (hours >= 18 && hours < 24) {
        greeting.innerText = `Good Evening, ${text}`;
    }
    
}
function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askUserName();
    } else {
        displayGreeting(currentUser);
    }
}
function getCurrentTime(){
    const date= new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}`: minutes}:${seconds < 10 ? `0${seconds}`:seconds}`;

}

function init(){
    getCurrentTime();
    loadName();
    setInterval(getCurrentTime, 1000);   
}

init();