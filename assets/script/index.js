// Authentication Variables
var adminLoginBtn = document.getElementById("admin-login-button");
var adminName = document.getElementById("admin-name");
var adminLogoutBtn = document.getElementById("admin-logout-button");
var enteredUsername = document.getElementById("entered-username");
var enteredPassword = document.getElementById("entered-password");
var errorMessage = document.getElementById("error-message");

// Artical variables
var addArticalBtn = document.getElementById("add-artical-button");
var deleteArticalBtns = document.getElementsByClassName("artical-delete-icon");
var enteredUsername = document.getElementById("entered-username");
var enteredPassword = document.getElementById("entered-password");
var errorMessage = document.getElementById("error-message");

var articalArea = document.getElementById("articals-area");
var articalForm = document.getElementById("article-form");
var enteredArticalTitle = document.getElementById("article-title");
var enteredArticalAuthor = document.getElementById("article-author");
var enteredArticalDesc = document.getElementById("article-desc");

var singalArtical = document.getElementById("singal-artical");
singalArtical.style.display = "none";
var singalArticalTitle = document.getElementById("singal-artical-title");
var singalArticalDesc = document.getElementById("singal-artical-desc");
var singalArticalAuthor = document.getElementById("singal-artical-author");
var singalArticalTime = document.getElementById("singal-artical-time");

// News Letters variables
var addNewsLetterBtn = document.getElementById("add-news-letter-button");
var deleteNewsLetterBtns = document.getElementsByClassName(
  "news-letter-delete-icon"
);

var newsLettersArea = document.getElementById("news-letters-area");
var newsLetterForm = document.getElementById("news-letter-form");
var enteredNewsLetterTitle = document.getElementById("news-letter-title");
var enteredNewsLetterAuthor = document.getElementById("news-letter-author");
var enteredNewsLetterDesc = document.getElementById("news-letter-desc");

var singalNewsLetter = document.getElementById("singal-news-letter");
singalNewsLetter.style.display = "none";

var singalNewsLetterTitle = document.getElementById("singal-news-letter-title");
var singalNewsLetterDesc = document.getElementById("singal-news-letter-desc");
var singalNewsLetterAuthor = document.getElementById(
  "singal-news-letter-author"
);
var singalNewsLetterTime = document.getElementById("singal-news-letter-time");

// Run on window load
window.onload = function () {
  // Admin Credential
  adminCredentials = {
    username: "dipeshvaghela",
    password: "Admin@5898",
    name: "Dipesh Vaghela",
  };

  // check locally articalList is there or not
  if (localStorage.getItem("articalList") != null) {
    articalList = JSON.parse(localStorage.getItem("articalList"));
    articalList.forEach((artical) => {
      addArticalToPage(artical.id, artical.title, artical.author, artical.desc);
    });
  }

  // check locally newsLetterList is there or not
  if (localStorage.getItem("newsLetterList") != null) {
    newsLetterList = JSON.parse(localStorage.getItem("newsLetterList"));
    newsLetterList.forEach((newsLetter) => {
      addNewsLetterToPage(
        newsLetter.id,
        newsLetter.title,
        newsLetter.author,
        newsLetter.desc
      );
    });
  }

  // Check whether admin is already authenticated or not
  if (
    localStorage.getItem("isAdminAuthenticated") != null &&
    localStorage.getItem("isAdminAuthenticated") == "true"
  ) {
    isAdminAuthenticated = true;
    adminLoginBtn.style.display = "none";
    adminName.innerText = adminCredentials.name;
    adminLogoutBtn.style.display = "block";

    addArticalBtn.style.display = "block";
    for (let item of deleteArticalBtns) {
      item.style.display = "block";
    }

    addNewsLetterBtn.style.display = "block";
    for (let item of deleteNewsLetterBtns) {
      item.style.display = "block";
    }
  } else {
    isAdminAuthenticated = false;
    adminLoginBtn.style.display = "block";
    adminName.innerText = "";
    adminLogoutBtn.style.display = "none";

    addArticalBtn.style.display = "none";
    for (let item of deleteArticalBtns) {
      item.style.display = "none";
    }

    addNewsLetterBtn.style.display = "none";
    for (let item of deleteNewsLetterBtns) {
      item.style.display = "none";
    }
  }
};

// To open login modal
var loginModel = document.getElementById("loginModel");
loginModel.addEventListener("show.bs.modal", function (event) {});
loginModel.addEventListener("hide.bs.modal", function (event) {});

// To get bootstrap instance of login model
// It will help to close or dispose the login dialog manullay
var loginModelInstance = new bootstrap.Modal(loginModel, {});

// to login admin
function adminLogin(event) {
  event.preventDefault();
  let username = enteredUsername.value;
  let password = enteredPassword.value;

  // Admin Authenticated
  if (
    username === adminCredentials.username &&
    password === adminCredentials.password
  ) {
    localStorage.setItem("isAdminAuthenticated", true);
    enteredUsername.disabled = true;
    enteredPassword.disabled = true;
    errorMessage.style.color = "green";
    errorMessage.innerText = "Welcome " + adminCredentials.name;

    setTimeout(() => {
      loginModelInstance.hide();
      isAdminAuthenticated = "true";
      adminLoginBtn.style.display = "none";
      adminName.innerText = adminCredentials.name;
      adminLogoutBtn.style.display = "block";

      addArticalBtn.style.display = "block";
      for (let item of deleteArticalBtns) {
        item.style.display = "block";
      }

      addNewsLetterBtn.style.display = "block";
      for (let item of deleteNewsLetterBtns) {
        item.style.display = "block";
      }
    }, 1000);
  }
  // Admin Authenticated
  else {
    errorMessage.innerText = "Invalid username or password !";
  }
}

// to login admin
function logoutAdmin() {
  localStorage.setItem("isAdminAuthenticated", false);
  isAdminAuthenticated = false;
  adminLoginBtn.style.display = "block";
  adminName.innerText = "";
  adminLogoutBtn.style.display = "none";

  addArticalBtn.style.display = "none";
  for (let item of deleteArticalBtns) {
    item.style.display = "none";
  }
  articalForm.style.display = "none";

  addNewsLetterBtn.style.display = "none";
  for (let item of deleteNewsLetterBtns) {
    item.style.display = "none";
  }
  newsLetterForm.style.display = "none";
}

function resetLoginForm() {
  enteredUsername.value = "";
  enteredUsername.focus();
  enteredPassword.value = "";
  errorMessage.innerText = "";
}

function removeErrorMessage() {
  errorMessage.innerText = "";
}

//
// Artical Functions
// To open Artical form
function openArticalForm() {
  if (articalForm.style.display == "block") articalForm.style.display = "none";
  else articalForm.style.display = "block";
}

// To open News Letter form
function openNewsLetterForm() {
  if (newsLetterForm.style.display == "block")
    newsLetterForm.style.display = "none";
  else newsLetterForm.style.display = "block";
}

// To open Artical form
function closeArticalForm() {
  articalForm.style.display = "none";
  enteredArticalTitle.value = "";
  enteredArticalAuthor.value = "";
  enteredArticalDesc.value = "";
}

// To add new artical
function addArticle(event) {
  event.preventDefault();
  let title = enteredArticalTitle.value;
  let author = enteredArticalAuthor.value;
  let desc = enteredArticalDesc.value;

  const p = new Artical(
    "A" + getUniqueId(),
    author,
    title,
    desc,
    new Date().toDateString()
  );
  articalList.unshift(p);
  let articalListString = JSON.stringify(articalList);
  localStorage.setItem("articalList", articalListString);
  addArticalToPage(p.id, author, title, desc);

  enteredArticalTitle.value = "";
  enteredArticalAuthor.value = "";
  enteredArticalDesc.value = "";
}

// Add artical to local storage
function addArticalToPage(id, title, author, desc) {
  let newArticle = document.createElement("div");
  newArticle.id = id;
  newArticle.classList.add("col-lg-5");
  newArticle.classList.add("col-sm-9");
  newArticle.classList.add("col-9");
  newArticle.classList.add("article-card");
  newArticle.classList.add("my-4");
  newArticle.classList.add("mx-3");
  newArticle.classList.add("p-4");
  newArticle.onclick = function (event) {
    // prevent from delete button
    if (event.target.localName !== "img") {
      showSingleArtical(event.currentTarget.id);
    }
  };
  if (desc.length >= 100) {
    desc = desc.substr(0, 100) + " . . .";
  }
  newArticle.innerHTML =
    '<h3 class="artical-card-title">' +
    title +
    "</h3>" +
    '<p class="artical-card-desc"> ' +
    desc +
    '</p><span class="artical-card-author">' +
    "Posted by ~ " +
    author +
    "</span>" +
    '<img class="artical-delete-icon" src="./assets/img/trash-fill.svg" alt="not found" onclick="deleteArtical(`' +
    id +
    '`)"/> ';
  articalArea.appendChild(newArticle);
}

function deleteArtical(id) {
  // From local storage
  articalList = articalList.filter((artical) => {
    return artical.id !== id;
  });
  let articalListString = JSON.stringify(articalList);
  localStorage.setItem("articalList", articalListString);

  // From page
  let articals = document.getElementById("articals-area");
  let artical = document.getElementById(id);
  articals.removeChild(artical);
}

function showArticals() {
  articalArea.style.display = "flex";
  singalArtical.style.display = "none";
}
function showSingleArtical(id) {
  articalForm.style.display = "none";
  articalArea.style.display = "none";
  singalArtical.style.display = "flex";
  let artical;
  articalList.forEach((a) => {
    if (a.id == id) {
      artical = a;
    }
  });
  singalArticalTitle.innerText = artical.title;
  singalArticalDesc.innerText = artical.desc;
  singalArticalAuthor.innerText = "Posted by ~ " + artical.author;
  singalArticalTime.innerText = "Date posted ~ " + artical.addedBy;
}

//
// News Letters Functions
// To open News Letter form
function openNewsLetterForm() {
  if (newsLetterForm.style.display == "block")
    newsLetterForm.style.display = "none";
  else newsLetterForm.style.display = "block";
}

// To open News Letter form
function closeNewsLetterForm() {
  newsLetterForm.style.display = "none";
  enteredNewsLetterTitle.value = "";
  enteredNewsLetterAuthor.value = "";
  enteredNewsLetterDesc.value = "";
}

// To add new News Letter
function addNewsLetter(event) {
  event.preventDefault();
  let title = enteredNewsLetterTitle.value;
  let author = enteredNewsLetterAuthor.value;
  let desc = enteredNewsLetterDesc.value;

  const n = new NewsLetter(
    "N" + getUniqueId(),
    author,
    title,
    desc,
    new Date().toDateString()
  );
  newsLetterList.unshift(n);
  let newsLetterListString = JSON.stringify(newsLetterList);
  localStorage.setItem("articalList", newsLetterListString);
  addNewsLetterToPage(n.id, author, title, desc);

  enteredNewsLetterTitle.value = "";
  enteredNewsLetterAuthor.value = "";
  enteredNewsLetterDesc.value = "";
}

// Add artical to local storage
function addNewsLetterToPage(id, title, author, desc) {
  let newNewsLetter = document.createElement("div");
  newNewsLetter.id = id;
  newNewsLetter.classList.add("col-lg-5");
  newNewsLetter.classList.add("col-sm-9");
  newNewsLetter.classList.add("col-9");
  newNewsLetter.classList.add("news-letter-card");
  newNewsLetter.classList.add("my-4");
  newNewsLetter.classList.add("mx-3");
  newNewsLetter.classList.add("p-4");
  newNewsLetter.onclick = function (event) {
    // prevent from delete button
    if (event.target.localName !== "img") {
      showSingleNewsLetter(event.currentTarget.id);
    }
  };
  if (desc.length >= 100) {
    desc = desc.substr(0, 100) + " . . .";
  }
  newNewsLetter.innerHTML =
    '<h3 class="news-letter-card-title">' +
    title +
    "</h3>" +
    '<p class="news-letter-card-desc"> ' +
    desc +
    '</p><span class="news-letter-card-author">' +
    "Posted by ~ " +
    author +
    "</span>" +
    '<img class="news-letter-delete-icon" src="./assets/img/trash-fill.svg" alt="not found" onclick="deleteNewsLetter(`' +
    id +
    '`)"/> ';
  newsLettersArea.appendChild(newNewsLetter);
}

function deleteNewsLetter(id) {
  // From local storage
  newsLetterList = newsLetterList.filter((newsLetter) => {
    return newsLetter.id !== id;
  });
  let newsLetterListString = JSON.stringify(newsLetterList);
  localStorage.setItem("newsLetterList", newsLetterListString);

  // From page
  let newsLetters = document.getElementById("news-letters-area");
  let newsLetter = document.getElementById(id);
  newsLetters.removeChild(newsLetter);
}

function showNewsLetters() {
  newsLettersArea.style.display = "flex";
  singalNewsLetter.style.display = "none";
}
function showSingleNewsLetter(id) {
  newsLetterForm.style.display = "none";
  newsLettersArea.style.display = "none";
  singalNewsLetter.style.display = "flex";
  let newsLetter;
  newsLetterList.forEach((a) => {
    if (a.id == id) {
      newsLetter = a;
    }
  });
  singalNewsLetterTitle.innerText = newsLetter.title;
  singalNewsLetterDesc.innerText = newsLetter.desc;
  singalNewsLetterAuthor.innerText = "Posted by ~ " + newsLetter.author;
  singalNewsLetterTime.innerText = "Date posted ~ " + newsLetter.addedBy;
}
