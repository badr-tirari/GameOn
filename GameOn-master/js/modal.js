//@ts-nocheck
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBtnClose = document.querySelector(".close");
const formData = document.querySelectorAll(".formData");
const form = document.getElementById("form");
const validForm = document.querySelector(".validationForm");

// Const récupérer les champs du formulaire
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const locationTournament = document.getElementsByName("location");
const condition = document.getElementById("checkbox1");
const validMessage = document.getElementById("validMessage");
const btnSubmit = document.getElementById("btnSubmit");
const btnValid = document.getElementById("btnValid");

// Const pour les champs valide ou non
const firstText = document.getElementById("firstText");
const lastText = document.getElementById("lastText");
const emailText = document.getElementById("emailText");
const birthdateText = document.getElementById("birthdateText");
const quantityText = document.getElementById("quantityText");
const locationText = document.getElementById("locationText");
const conditionText = document.getElementById("conditionText");


// ----- Evènement pour ouvrir ou fermer le Formulaire -----

// Open modal event
modalBtn.forEach((btn) => btn.addEventListener("click", openModal));

// Open modal form
function openModal() {
  modalbg.style.display = "block";                            // Ajout a modalbg un display : block; au css css pour le faire apparaitre
};

// Hidemodal form
function hideModal() {
  modalbg.style.display = "none";                             // Ajout a modalbg un display : none; au css pour le faire disparaitre
};

// Close modal form 
modalBtnClose.addEventListener("click", function() {          // Évènement au click
  modalbg.style.display = "none";                             // Pour fermer la modal avec le bouton close
});

// Création des RegEx
let regExTypeText = new RegExp(
  '^([A-Za-z]{2,20})?([-]{0,1})?([A-Za-z]{2,20})$'            // Une expression rationnelle qui prends en condition des lettres en Maj et Min entre 2 à 20 + - + 2 à 20 de plus ex : Jean-Pierre
);
let regExTypeEmail = new RegExp(                              // Une expression rationnelle qui prends en condition pour les emails
  '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$'
);

// ----- FONCTION GENERIQUE POUR FirstName + LastName + Email -----
firstName.addEventListener('change', function() {
  generiqueValidate(this,regExTypeText,"Veuillez rentrer deux caractères minimum", firstText, this);
});

lastName.addEventListener('change', function() {
  generiqueValidate(this,regExTypeText,"Veuillez rentrer deux caractères minimum", lastText, this);
});

email.addEventListener('change', function() {
  generiqueValidate(this,regExTypeEmail,"Veuillez rentrer un adresse email valide", emailText, this);
});


function generiqueValidate(input,regEx,msg,label,border) {    // Paramètres

  let testValid = regEx.test(input.value);                    // Un test du RegEx en récupérant la valeur

   if(testValid) {
    label.innerHTML = "Champs Valide";
    label.classList.remove('text-danger');
    label.classList.add('text-succes');
    border.classList.remove('border-danger');
    border.classList.add('border-succes');
    return true;
   }else {
    label.innerHTML = msg;
    label.classList.remove('text-succes');
    label.classList.add('text-danger');
    border.classList.remove('border-succes');
    border.classList.add('border-danger');
    return false;
   }
}

// ----- ANNIVERSAIRE-----
birthdate.addEventListener('change', function() {
  validBirthdate(this);
});

const validBirthdate = function() {

  if(! birthdate) {
    birthdateText.innerHTML = "Veuillez entrer une date de naissance valide";
    birthdateText.classList.remove('text-succes');
    birthdateText.classList.add('text-danger');
    birthdate.classList.remove('border-succes');
    birthdate.classList.add('border-danger');
    return false;
  }else {
    birthdateText.innerHTML = "Champs Valide";
    birthdateText.classList.remove('text-danger');
    birthdateText.classList.add('text-succes');
    birthdate.classList.remove('border-danger');
    birthdate.classList.add('border-succes');
    return true;
  }
};

// ----- NOMBRE DE TOURNOIS -----
quantity.addEventListener('change', function() {
  validQuantity(this);
});

const validQuantity = function() {
  if(quantity.value === 0 || quantity.value < 0) {       // Si la valeur est égale à 0 ou si la valeur est supérieure à 0
    quantityText.innerHTML = "Merci d'indiquer le nombre de tournois";
    quantityText.classList.remove('text-succes');
    quantityText.classList.add('text-danger');
    quantity.classList.remove('border-succes');
    quantity.classList.add('border-danger');
    return false;
  }else if(quantity.value > 50) {
    quantityText.innerHTML = "Nous n'avons pas organisé autant de tournois !";
    quantityText.classList.remove('text-succes');
    quantityText.classList.add('text-danger');
    quantity.classList.remove('border-succes');
    quantity.classList.add('border-danger');
    return false;
  }else {
    quantityText.innerHTML = "Champs Valide";
    quantityText.classList.remove('text-danger');
    quantityText.classList.add('text-succes');
    quantity.classList.remove('border-danger');
    quantity.classList.add('border-succes');
    return true;
  }
};

// ----- VILLES -----

// Fonctions pour les lieux de tournois si d'autres villes sont ajoutés dans le futur
function verifLocationTournament() {
  let locTournamentCheck = false; 
  for(let i = 0; i < locationTournament.length; i++) {
    const isCheck = locationTournament[i].checked;
    if(isCheck) {
      locTournamentCheck = true;
      return true;
    }
  }
  return false;
}

locationTournament.forEach((checkedBoxInput) => checkedBoxInput.addEventListener('change', function() {
  validLocationTournament(); 
}));

function validLocationTournament() {
  if(! verifLocationTournament()) {
      locationText.innerHTML = "Merci de cocher une ville";
      locationText.classList.remove('text-succes');
      locationText.classList.add('text-danger');
      return false;
  } else {
      locationText.innerHTML = "Champs valide";
      locationText.classList.remove('text-danger');
      locationText.classList.add('text-succes');
      return true;
  }
}


// ----- CONDITIONS -----
condition.addEventListener('change', function() {
  validCondition(this); 
});

// Vérifie si les conditions sont biens cochées ou non
const validCondition = function() {
  if(condition.checked == false ) {                  
    conditionText.innerHTML = "Merci d'accepter les conditions d'utilisations";
    conditionText.classList.remove('text-succes');
    conditionText.classList.add('text-danger');
    return false;
  }else {
    conditionText.innerHTML = "Champs Valide";
    conditionText.classList.remove('text-danger');
    conditionText.classList.add('text-succes');
    return true;
  }
};

//----- BTN VALIDATION -----
function openRemerciments() {
  form.style.display = "none";
  validForm.style.display = "flex";
  validMessage.innerHTML = "Merci pour votre inscription";
};

function validate() {
  // Condition qui vérifie si tous les autres conditions retourne true
  if (generiqueValidate(firstName, regExTypeText, "firstname error", firstText, firstName)
  && generiqueValidate(lastName, regExTypeText, "lastname error", lastText, lastName)
  && generiqueValidate(email, regExTypeEmail, "email error", emailText, email)
  && validBirthdate(birthdate) 
  && validQuantity(quantity) 
  && validLocationTournament()
  && validCondition(condition)) {

    openRemerciments();

  }else {
    alert("Merci de remplir correctement votre inscription");
  }
}

//----- BTN SUBMIT -----

btnValid.addEventListener("click", function() { 
  window.location.reload();
});