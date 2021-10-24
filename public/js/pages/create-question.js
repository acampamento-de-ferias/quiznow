const answersList = document.getElementsByClassName('answer');
const wrongAnswers = document.getElementsByClassName('wrong-answer');
const wrongIcons = document.getElementsByClassName('wrong-icon');
const formControl = {
  title: {
    value: '',
    validate: '',
  },
  answers: [
    {
      value: '',
      validate: '',
    },
    {
      value: '',
      validate: '',
    },
  ],
};

document.addEventListener('DOMContentLoaded', (event) => {
  event.target.querySelector('.title-section textarea').focus();
});

/**
 * Add new answer input in the list
 * @param {Element} element
 */
function addNewAnswer() {
  if (answersList.length < 8) {
    const newAnswer = answersList[answersList.length - 1].cloneNode(true);
    const newAnswerInput = newAnswer.querySelector('input');
    newAnswerInput.value = '';
    newAnswer.dataset.id++;
    answersList[answersList.length - 1].after(newAnswer);
    newAnswerInput.focus();
    formControl.answers.push({
      value: '',
      validate: '',
    });
    document.querySelector('#add-answer').disabled = answersList.length === 8;
    validateList('answer', 'answers');
    categoryForm === 'questions-answers' ? changeIconToTrash(wrongIcons) : '';
  }
}

/**
 * Replace close icon to trash icon
 * @param {Element} elements
 */
function changeIconToTrash(elements) {
  for (let el of elements) {
    el.alt = 'Deletar resposta';
    el.src = './images/trash.png';
    el.classList.add('cursor-pointer');
  }
}

/**
 * Replace trash icon to close icon
 * @param {Element} element
 */
function changeIconToClose(element) {
  element.alt = 'Resposta errada';
  element.src = './images/close.png';
  element.classList.remove('cursor-pointer');
}

function xpto(button, input) {
  button.closest(input).remove();
  document.querySelector('#add-answer').disabled = false;
  reoderAnswersIndex(button.closest(input));
  validateList('answer', 'answers');
  formControl.answers.splice(0, button.dataset.id);
  formControl.answers.pop();
}

/**
 * Remove wrong answer element
 * @param {Element} el
 */
function deleteAnswer(el) {
  if (el.src && el.src.includes('trash')) {
    xpto(el, '.wrong-answer');
    const lastWrongIcon = document.getElementsByClassName('wrong-icon');
    if (lastWrongIcon.length < 2) {
      changeIconToClose(lastWrongIcon[lastWrongIcon.length - 1]);
    }
  } else if (el.className.includes('dropdown-item') && answersList.length >= 3) {
    xpto(el, '.personality-answer');
  }
}

/**
 * Sort answers index in ascending order
 * @param {Element} element
 */
function reoderAnswersIndex(element) {
  for (let i = element.dataset.id; i < answersList.length; i++) {
    answersList[i].dataset.id = answersList[i].dataset.id - 1;
  }
}

/**
 * Enable or disable button
 * @param {String} el
 * @param {Boolean} value
 */
function changeButtonState(el, value) {
  if (!value) {
    if (formControl.title.validate) {
      document.querySelector(el).disabled = value;
    }
  } else {
    document.querySelector(el).disabled = value;
  }
}

/**
 * Return to create quiz page submitting info
 */
function saveQuestion() {
  questionsForm.push({
    title: formControl.title.value,
    answers: formControl.answers,
  });
  changePageWithSameUrl('create-question', 'create-quiz');
  renderQuestionSection();
}

/**
 * Return to create quiz page without saving
 */
function cancelQuestion() {
  changePageWithSameUrl('create-question', 'create-quiz');
  renderQuestionSection();
}
