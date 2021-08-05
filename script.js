//API SETUP

const fakeUserUrl = 'https://randomuser.me/api/?results=50&inc=name,dob,location,picture';

async function getDataFromApi(url) {
    const response = await fetch(url);
    const result =  await response.json();
    return result.results
}

//store request from api;
const userData = getDataFromApi(fakeUserUrl);

async function processData(data_p, i) {
    const data = await data_p;
    len = data.length;

    //wrap the array;
    if (i < 0) i = len - 1;
    else if (i == len) i = 0;
    
    //destructure variables
    const {picture : { large: image }, name: { first },
    name: { last }, dob : {age}, location : {city}, location : {state}} = data[i];

    // assign variables to attributes 
    userImg.setAttribute('src', image);
    userIdentifier.innerText = `${first} ${last}, ${age}`;
    userLocation.innerText = `${city}, ${state}`;
}

//get dom elements
const userImg = document.getElementById('user-img');
const userIdentifier = document.getElementById('user-identifier');
const userLocation = document.getElementById('user-location');
const arrowBtns = document.querySelectorAll('[data-arrow]');
let currentUser = 0;

processData(userData, currentUser);

//increment or decrement current array position on click
arrowBtns.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.getAttribute('id') == 'arrow-right') {
            currentUser++;
            processData(userData, currentUser);
        } else {
            currentUser--;
            processData(userData, currentUser);
        }
    })
})


