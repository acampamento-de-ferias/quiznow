const formControl = {
  title: {
    value: '',
    validate: ''
  },
  answers: [
    {
      value: '',
      validate: ''
    },
    {
      value: '',
      validate: ''
    }
  ]
};

/**
 * Add new answer input in the list
 * @param {Element} element 
 */
function addNewAnswer(element) {
  const newWrongAnswer = element[element.length - 1].cloneNode(true);
  newWrongAnswer.querySelector('input').value = '';
  newWrongAnswer.dataset.id++;
  element[element.length - 1].after(newWrongAnswer);
  formControl.answers.push({
    value: '',
    validate: ''
  });
  if (element.length === 7) {
    changeButtonState('#add-answer', true);
  }
  validateList('answer', 'answers');
}

/**
 * Replace close icon to trash icon
 * @param {Element} elements 
 */
function changeIconToTrash(elements) {
  for (const el of elements) {
    el.alt = 'Remover'
    el.src = './images/trash.png';
    el.classList.add('remove-question');
  }
}

/**
 * Replace trash icon to close icon
 * @param {Element} element 
 */
function changeIconToClose(element) {
  element.src = './images/close.png';
  element.classList.remove('remove-question');
}

/**
 * Remove wrong answer element
 * @param {Element} el 
 */
function deleteAnswer(el) {
  if (el.src.includes('trash')) {
    el.closest('.wrong-answer').remove();
    changeButtonState('#add-answer', false);
    reoderAnswersIndex(el.closest('.wrong-answer'));
    validateList('answer', 'answers');
    formControl.answers.splice(0, el.dataset.id);
    formControl.answers.pop();
    const lastWrongIcon = document.getElementsByClassName('wrong-icon');
    if (lastWrongIcon.length < 2) {
      changeIconToClose(lastWrongIcon[lastWrongIcon.length - 1]);
    }
  }
}

/**
 * Sort answers index in ascending order
 * @param {Element} element 
 */
function reoderAnswersIndex(element) {
  const answersList = document.getElementsByClassName('answer');
  for (let i = element.dataset.id; i < answersList.length; i++) {
    answersList[i].dataset.id = (answersList[i].dataset.id) - 1;
  }
}

/**
 * Init question and answers events
 */
function createQuestionController() {
  let wrongAnswers = document.getElementsByClassName('wrong-answer');
  let wrongIcons = document.getElementsByClassName('wrong-icon');
  const addAnswerButton = document.querySelector('#add-answer');

  addAnswerButton.addEventListener('click', () => {
    if (wrongAnswers.length < 7) {
      addNewAnswer(wrongAnswers);
      changeIconToTrash(wrongIcons);
    }
  });
};

createQuestionController();
