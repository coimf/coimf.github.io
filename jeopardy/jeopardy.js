let currentQuestion = -1;
const dialog = document.getElementById('questionBox');
const dialogQuestion = document.getElementById('dialogQuestionText');
const dialogAnswer = document.getElementById('dialogAnswerText');
let scrollablePage = false;

let questions = [
    undefined,
    "Where did pizza come from?",
    "What is Eshaansh's last name?",
    "How old is Mr. E as of January 2024?",
    "How many US dollars does the most expensive Steinway piano cost?",
    "How many employees does Apple have as of 2023?",
    "Where does pineapple pizza originate from?",
    "What is Agrawal's last name?",
    "Is Dr. Suba eligible for presidency as of January 2024?",
    "What is the diameter of the largest pizza in the world to the nearest feet?",
    "When was Stratford Schools founded?",
    "Where do tacos come from?",
    "What is Kanishk's last name?",
    "How many glasses does Mrs. Makhijani have?",
    "How many hands does a clock have?",
    "Which toilet paper brand sells the most toilet paper?",
    "Where does Mapo Tofu come from?",
    "What is Obama's last name?",
    "Is Mr. E Persian or Assyrian?",
    "Are decibels a logarithmic unit?",
    "Name all 5 of the FAANG companies.",
    "Who invented the potato chip?",
    "What is Benjamin's last name?",
    "What color is Mr. Pascua's water bottle?",
    "Who sells more shoes: Nike or Adidas?",
    "How much are all of Blackrock's assets worth as of June 2023?"
];
let answers = [
    undefined,
    "Italy",
    "Kapoor",
    "30-60-90",
    "$2.5 million dollars",
    "About 160 thousand",
    "Canada",
    "Agrawal",
    "Yes",
    "123 feet",
    "1999",
    "Mexico",
    "Jain",
    "3",
    "3",
    "AngelSoft",
    "China",
    "Barack",
    "Assryian",
    "Yes they are.",
    "Facebook, Amazon, Apple, Netflix, Google",
    "George Crum",
    "Ha",
    "Orange",
    "Nike, obviously.",
    "9.42 trillion dollars"
];
function resetPageScroll() {
    scroll(0,0);
}
function newTheme() {
    let theme = document.getElementById('theme').value;
    document.getElementById('sub-title').innerText = theme;
}
function defaultCategories() {
    document.getElementById("category1").value = "Food";
    document.getElementById("category2").value = "Last names";
    document.getElementById("category3").value = "Teachers";
    document.getElementById("category4").value = "Random stuff";
    document.getElementById("category5").value = "Companies";
}
function newCategory() {
    for (let i = 1; i<6; i++) {
        let cID = "category-"+i;
        let rValID = "category"+i;
        let rVal = document.getElementById(rValID).value;
        if (rVal.length < 1) {
            defaultCategories();
        }
        document.getElementById(cID).value = rVal;
    }
}
function showQuestion(question) {
    currentQuestion = question;
    const questionElement = document.getElementById('q'+currentQuestion);
    if (questionElement.classList.contains('removed')) {
        return;
    }
    dialog.showModal();
    document.getElementById('q'+currentQuestion).classList.add('removed');
    dialogQuestion.innerText = questions[currentQuestion];
    dialogAnswer.innerText = "Make your guesses.";
    return currentQuestion;
}
function showAnswer() {
    dialogAnswer.innerText = answers[currentQuestion];
}
function closeQuestion() {
    dialog.close();
}
function showSetup() {
    document.getElementById('setup').classList.add('opened');
    document.getElementById('setup').classList.remove('closed');
    document.getElementById('main').classList.add('closed');
    document.getElementById('main').classList.remove('opened');
    scrollablePage = false;
    resetPageScroll();

}
function hideSetup() {
    document.getElementById('setup').classList.add('closed');
    document.getElementById('setup').classList.remove('opened');
    document.getElementById('main').classList.add('opened');
    document.getElementById('main').classList.remove('closed');
    scrollablePage = true;
    resetPageScroll();
}
function toggleSetup() {
    if (document.getElementById('main').classList.contains('opened')) {
        showSetup();
    } else {
        hideSetup();
    }
}
function fillTemplate() {
    for (let i = 1; i < 26; i++) {
        let qID = "question"+i;
        let aID = "answer"+i;
        document.getElementById(qID).value = "";
        document.getElementById(aID).value = "";
    }
}
function hideUnusedTeams() {
    let nT = document.getElementById('numTeams').value-1;
    if (nT === -1) {
        return;
    }
    for (let i = 1; i<11; i++) {
        if (i > Number(nT)+Number(1)) {
            document.getElementById(i).classList.add('noDisplay');
        } else {
            document.getElementById(i).classList.remove('noDisplay');
            document.getElementById("teamName"+i).innerText = document.getElementById("teamNameL"+i).value;
        }
    }
}
function saveSetup() {
    /* for (let i = 1; i < 25; i++) {
        let qID = "question"+i;
        let aID = "answer"+i;
        let e = document.getElementById(qID).value;
        let f = document.getElementById(aID).value;
        if (e.length<1 || f.length<1) {
            window.alert("More than one field is blank");
            return;
            // ADD THE CODE TO SHOW A MESSAGE THAT 
            // NOT ALL TEXT FIELDS ARE FILLED
        }
    } */
    for (let j = 1; j < 25; j++) {
        let qID = "question"+j
        let aID = "answer"+j
        let r = document.getElementById(qID).value;
        let p = document.getElementById(aID).value;
        if (r.length < 1 || p.length < 1) {
            hideUnusedTeams();
            newTheme();
            newCategory();
            hideSetup();
            return;
        }
        questions[j] = r;
        answers[j] = p;
    }
    hideUnusedTeams();
    newTheme();
    newCategory();
    hideSetup();
}
fillTemplate();
(() => {
    document.getElementById('sub-title').innerText = "No topic selected";
    defaultCategories();
})();
addEventListener("scroll", () => {
    if (scrollablePage === true) {
        resetPageScroll();
    } else {
        return;
    }
});
