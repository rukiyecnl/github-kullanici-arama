const checkbox = document.querySelector(".checkbox");
const lightThema = document.querySelector(".lightThema");
const darkThema = document.querySelector(".darkThema");
const nameTitle = document.querySelector(".name");
const createdTime = document.querySelector(".createdTime");
const username = document.querySelector(".username");
const bio = document.querySelector(".bio");
const repoNum = document.querySelector(".repoNum");
const followerNum = document.querySelector(".followerNum");
const followingNum = document.querySelector(".followingNum");
const konum = document.querySelector(".location");
const twitter = document.querySelector(".twitter");
const gitLink = document.querySelector(".gitLink");
const company = document.querySelector(".company");
const avatar = document.querySelector(".avatar");

const mainPlace = document.querySelector(".mainPlace");
const loading = document.querySelector(".loading");
mainPlace.style.display = "none";

//localStorage
let darkmode = localStorage.getItem("darkmode");

const enableDarkMode = function(){
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkmode", "enable");
}

const disableDarkMode = function(){
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkmode", null);
}

if (darkmode === "enable") {
    enableDarkMode();
    checkbox.checked = true; 
}


//fetch ile verileri cek
async function fetchVeri(){
    const response = await fetch("https://api.github.com/users/orhanekici");
    const data = await response.json();
    return data;
}

function bindCheckbox(){
    checkbox.addEventListener("change", function(){
        // document.body.classList.toggle('dark-mode');
        darkmode = localStorage.getItem("darkmode");
        if(darkmode !== "enable"){
            enableDarkMode();
        }
        else{
            disableDarkMode();
        }

        //
        if (checkbox.checked) {
            lightThema.style.display = "block";
            darkThema.style.display = "none"; 
        }
        if(!checkbox.checked){
            lightThema.style.display = "none";
            darkThema.style.display = "block";
        }
        
    })    
}

async function getData(){
    const data = await fetchVeri();

    mainPlace.style.display = "flex";
    loading.style.display = "none";


    avatar.src = `${data.avatar_url}`;

    nameTitle.innerHTML = `${data.name}`;

    username.innerHTML = `<a href="${data.html_url}" class="userName">@${data.login}</a>`;

    let longTime = `${data.created_at}`;
    let dilimle = longTime.split("T");
    console.log(dilimle);
    let fullTarihiBöl = dilimle[0].split("-");
    console.log(fullTarihiBöl);
    // index 0 = yil, index 1 = ay, index 2 = gün

    let ay = fullTarihiBöl[1];

    createdTime.innerHTML = `Joined ${fullTarihiBöl[2]} ${monthToText(ay)} ${fullTarihiBöl[0]}`;

    if (data.bio == null) {
        bio.innerHTML = "This profile has no bio";
    } else {
        bio.innerHTML = `${data.bio}`; 
    }
    
    repoNum.innerHTML = `${data.public_repos}`;
    followerNum.innerHTML = `${data.followers}`;
    followingNum.innerHTML = `${data.following}`;
    konum.innerHTML = `${data.location}`;

    if (data.twitter_username == null) {
        twitter.innerHTML = "Not Available";
    }
    else{
        twitter.innerHTML = `${data.twitter_username}`;  
    }

    company.innerHTML = `${data.company}`;

    if (data.blog == "") {
        gitLink.innerHTML = "No Blog";
    }
    else {
        gitLink.innerHTML = `<a href="${data.blog}" class="userName">${data.blog}</a>`;
    }

    
    
}

function monthToText(value){
    if (value == "01") {
        value = "Jan";
    } 
    else if(value == "02"){
        value = "Fab";
    }
    else if(value == "03"){
        value = "Mar";
    }
    else{
        return false;
    }
    return value;
}

bindCheckbox();
getData();
