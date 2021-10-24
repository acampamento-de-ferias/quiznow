const urlArrowDown = './images/arrow-collapse-down.png';
const urlArrowRight = './images/arrow-collapse-right.png';
let categorySelected = document.querySelectorAll('.option.active-option');
let categoryForm = 'questions-answers';
let questionsForm = [
  {
    title: 'Qual a cor do céu?',
    answers: [
      {
        value: 'Amarelo',
      },
      {
        value: 'Verde',
      },
      {
        value: 'Azul',
      },
    ],
  },
  {
    title: 'O sol é uma estrela',
    answers: [
      {
        value: 'Verdadeiro',
      },
      {
        value: 'Falso',
      },
    ],
  },
];

document.addEventListener('DOMContentLoaded', function (event) {
  renderQuestionSection();
});

function renderQuestionSection() {
  // Get the dinamicDiv Desktop
  const questionDivDesktop = document.querySelector('#question-dinamic-desktop');

  // Get the dinamicDiv Mobile
  const questionDivMobile = document.querySelector('#question-dinamic-mobile');

  // Get the html for desktop
  const questionHtmlDesktop = questionsForm
    .map(
      (question, indexQuestion) =>
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
                    ${question.answers
                      .map(
                        (answer, index) =>
                          `<span class="simple-text ${!index ? 'correct-answer' : ''}">
                            ${answer.value}
                        </span>`
                      )
                      .join('')}                    
                </p>
            </div>
        </div>`
    )
    .join('');

  // Get the HTML for mobile
  const questionHtmlMobile = questionsForm
    .map(
      (question, indexQuestion) =>
        `<div class="basic-card">
            <div class="row">
                <div class="col-10 question-infos">
                    <h3 class="third-title">${question.title}</h3>
                    <p class="answers">
                        ${question.answers
                          .map(
                            (answer, index) =>
                              `<span class="simple-text ${!index ? 'correct-answer' : ''}">
                                ${answer.value}
                            </span>`
                          )
                          .join('')} 
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
    )
    .join('');

  questionDivDesktop.innerHTML = questionHtmlDesktop;
  questionDivMobile.innerHTML = questionHtmlMobile;
}

function renderQuestionPage() {
  changePageWithSameUrl('create-quiz', 'create-question');
}

function renderRatingPage() {
  changePageWithSameUrl('create-quiz', 'rating');
}

function deleteQuestionAnswers(questionAnswersIndex) {
  questionsForm.splice(questionAnswersIndex, 1);
  renderQuestionSection();
}

function selectCategory(className, screen = 'mobile') {
  const indexScreen = screen === 'mobile' ? 0 : 1;
  categorySelected = NodeList.prototype.isPrototypeOf(categorySelected)
    ? categorySelected[indexScreen]
    : categorySelected;

  if (categorySelected.classList.contains(className)) {
    return;
  }

  categorySelected.classList.remove('active-option');
  const element = document.getElementsByClassName(className)[indexScreen];
  element.classList.add('active-option');
  categorySelected = element;
  categoryForm = categorySelected.getAttribute('data-value');
}

function selectAccordion(event) {
  const element = event.children[0];
  const elementButton = event;

  if (element.classList.contains('arrow-down')) {
    element.setAttribute('src', urlArrowRight);
    element.setAttribute('alt', 'Seta para direita');
    element.classList.remove('arrow-down');
    element.classList.add('arrow-right');
    return;
  }

  if (element.classList.contains('arrow-right')) {
    element.setAttribute('src', urlArrowDown);
    element.setAttribute('alt', 'Seta para baixo');
    element.classList.remove('arrow-right');
    element.classList.add('arrow-down');
    Array.from(document.getElementsByClassName('accordion-button')).forEach((elementF) => {
      if (
        elementF.getAttribute('id') !== elementButton.getAttribute('id') &&
        elementF.children[0].classList.contains('arrow-down')
      ) {
        elementF.children[0].setAttribute('src', urlArrowRight);
        elementF.children[0].setAttribute('alt', 'Seta para direita');
        elementF.children[0].classList.remove('arrow-down');
        elementF.children[0].classList.add('arrow-right');
      }
    });
    return;
  }
}
