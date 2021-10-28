const urlArrowDown = "./images/arrow-collapse-down.png";
const urlArrowRight = "./images/arrow-collapse-right.png";
let categorySelected = document.querySelectorAll('.option.active-option');

const formControlQuiz = {
    quizCategory: 'questions-answers',
    quizTitle: {
        value: '',
        validate: false
    },
    quizDescription: {
        value: '',
        validate: true
    },
    quizKeywords: {
        value: '',
        validate: false
    },
    quizQuestions: [{
        title: "Qual a cor do céu?",
        answers: [{
            value: "Amarelo"
        }, {
            value: "Verde"
        }, {
            value: "Azul"
        }]
    }, {
        title: "O sol é uma estrela",
        answers: [{
            value: "Verdadeiro"
        }, {
            value: "Falso"
        }]
    }]
};

document.addEventListener("DOMContentLoaded", function(event) {
    renderQuestionSection();
});

function renderQuestionSection() {

    // Get the dinamicDiv Desktop
    const questionDivDesktop = document.querySelector("#question-dinamic-desktop");

    // Get the dinamicDiv Mobile
    const questionDivMobile = document.querySelector("#question-dinamic-mobile");

    // Get the html for desktop
    const questionHtmlDesktop = formControlQuiz.quizQuestions.map((question, indexQuestion) =>
            `<div class="basic-card">
            <div class="question-infos">
                <div class="management">
                    <div class="remove-question cursor-pointer" onclick="deleteQuestionAnswers(${indexQuestion})">
                        <img src="./images/trash.png" alt="Remove question">
                    </div>
                    <div class="edit-question cursor-pointer" onclick="renderQuestionPage(${indexQuestion})">
                        <img src="./images/edit.png" alt="Edit question">
                    </div>
                </div>
            
                <h3 class="third-title">${question.title}</h3>
                <p class="answers">
                    ${question.answers.map((answer, index) =>
                        `<span class="simple-text ${!index ? 'correct-answer' : ''}">
                            ${answer.value}
                        </span>`   
                    ).join('')}                    
                </p>
            </div>
        </div>`
    ).join('');

    // Get the HTML for mobile
    const questionHtmlMobile = formControlQuiz.quizQuestions.map((question, indexQuestion) => 
        `<div class="basic-card">
            <div class="row">
                <div class="col-10 question-infos">
                    <h3 class="third-title">${question.title}</h3>
                    <p class="answers">
                        ${question.answers.map((answer, index) =>
                            `<span class="simple-text ${!index ? 'correct-answer' : ''}">
                                ${answer.value}
                            </span>`   
                        ).join('')} 
                    </p>
                </div>
                <div class="col-2 management">
                    <div class="remove-question cursor-pointer" onclick="deleteQuestionAnswers(${indexQuestion})">
                        <img src="./images/trash.png" alt="Remove question">
                    </div>
                    <div class="edit-question cursor-pointer" onclick="renderQuestionPage(${indexQuestion})">
                        <img src="./images/edit.png" alt="Edit question">
                    </div>
                </div>
            </div>
        </div>`
    ).join('');
    
    questionDivDesktop.innerHTML = questionHtmlDesktop;
    questionDivMobile.innerHTML = questionHtmlMobile;
}

function renderQuestionPage(questionAnswersIndex = null) {
    changePageWithSameUrl('create-quiz', 'create-question');
    createQuestionController(questionAnswersIndex);
}

function renderResultsPage() {
    changePageWithSameUrl('create-quiz', 'results');
}

function deleteQuestionAnswers(questionAnswersIndex) {
    formControlQuiz.quizQuestions.splice(questionAnswersIndex, 1);
    renderQuestionSection();
}

function selectCategory(className, screen = "mobile") {
    const indexScreen = screen === "mobile" ? 0 : 1;
    categorySelected = NodeList.prototype.isPrototypeOf(categorySelected) ? categorySelected[indexScreen] : categorySelected;

    if (categorySelected.classList.contains(className)) {
        return;
    }

    categorySelected.classList.remove("active-option");
    const element = document.getElementsByClassName(className)[indexScreen];
    element.classList.add("active-option");
    categorySelected = element;
    formControlQuiz.quizCategory = categorySelected.getAttribute('data-value');
}

function selectAccordion(event) {
    const element = event.children[0];
    const elementButton = event;

    if (element.classList.contains("arrow-down")) {
        element.setAttribute("src", urlArrowRight);
        element.setAttribute("alt", "Seta para direita");
        element.classList.remove('arrow-down');
        element.classList.add("arrow-right");
        return;
    }

    if (element.classList.contains("arrow-right")) {
        element.setAttribute("src", urlArrowDown);
        element.setAttribute("alt", "Seta para baixo");
        element.classList.remove('arrow-right');
        element.classList.add("arrow-down");
        Array.from(document.getElementsByClassName("accordion-button")).forEach(elementF => {
            if (elementF.getAttribute("id") !== elementButton.getAttribute("id")
            && elementF.children[0].classList.contains("arrow-down")) {
                elementF.children[0].setAttribute("src", urlArrowRight);
                elementF.children[0].setAttribute("alt", "Seta para direita");
                elementF.children[0].classList.remove('arrow-down');
                elementF.children[0].classList.add("arrow-right");
            }
        });
        return;
    }
}

/**
 * Send data to backend
 * 
 */
function submitQuiz(event) {

    // Remove default http request 
    console.log(formControlQuiz);
    event.preventDefault();

    // Get data in the form
    // const data = {
    //     name: formControl.name.value,
    //     email: formControl.email.value,
    //     password: formControl.password.value
    // };

    // // Show loading before request be finished
    // const loading = document.getElementById("loading");
    // openElement(loading)

    // // Send data to backend using fetch
    // fetch('/register', {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     dataType: "json",
    //     mode: "same-origin",
    //     credentials: "same-origin",
    //     body: JSON.stringify(data)
    // }).then(function(response) {
    //     if (response.status !== 200) {
    //         throw new Error("Erro: não foi possível realizar sua requisição");
    //     }

    //     return response.json();
    // }).then(function(body) {
    //     if (body.status === 400) {
    //         throw new Error(body.message);
    //     }

    //     window.location.href = url;
    // }).catch(function(error) {
    //     openElement(document.querySelector("#alert"), false, true);
    //     document.querySelector("#alert .alert-message").innerHTML = error.message;
    //     closeElementByTime(document.querySelector("#alert"), 4000);
    // }).finally(function() {
    //     closeElement(loading);
    // });

}