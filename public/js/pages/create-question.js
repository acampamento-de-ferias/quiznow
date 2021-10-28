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
  // fix this
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
    categoryForm === 'questions-answers'
      ? changeIconToTrash(wrongIcons)
      : changeDropdownItemState('.delete-answer.cursor-not-allowed', false);
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

/**
 * Set state of dropdown-item
 * @param {String} selector
 * @param {Boolean} disabled
 */
function changeDropdownItemState(selector, disabled) {
  for (const item of document.querySelectorAll(selector)) {
    if (disabled) {
      item.classList.remove('cursor-pointer');
      item.classList.add('cursor-not-allowed');
    } else {
      item.classList.remove('cursor-not-allowed');
      item.classList.add('cursor-pointer');
    }
  }
}

/**
 * Remove all traces of deleted input
 * @param {Object} button
 * @param {String} input
 * @param {String} icon
 */
function clearInputTrace(button, input) {
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
    clearInputTrace(el, '.wrong-answer');
    const lastWrongIcon = document.getElementsByClassName('wrong-icon');
    if (lastWrongIcon.length < 2) {
      changeIconToClose(lastWrongIcon[lastWrongIcon.length - 1]);
    }
  } else if (el.className.includes('dropdown-item') && answersList.length >= 3) {
    clearInputTrace(el, '.personality-answer');
    const deleteItensList = document.getElementsByClassName('delete-answer');
    if (deleteItensList.length <= 2) {
      changeDropdownItemState('.delete-answer.cursor-pointer', true);
    }
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
