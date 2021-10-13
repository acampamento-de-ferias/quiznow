function addNewAnswer(element) {
  const newWrongAnswer = element[element.length - 1].cloneNode(true);
  newWrongAnswer.querySelector('input').value = '';
  newWrongAnswer.dataset.id++;
  element[element.length - 1].after(newWrongAnswer);
  if (element.length === 7) {
    changeButtonState('#add-answer', true);
  }
}

function changeIconToTrash(elements) {
  for (const el of elements) {
    el.alt = 'Remover'
    el.src = './images/trash.png';
    el.classList.add('remove-question');
  }
}

function changeIconToClose(element) {
  element.src = './images/close.png';
  element.classList.remove('remove-question');
}

function deleteAnswer(el) {
  if (el.src.includes('trash')) {
    el.closest('.wrong-answer').remove();
    changeButtonState('#add-answer', false);
    var lastWrongIcon = document.getElementsByClassName('wrong-icon');
    if (lastWrongIcon.length < 2) {
      changeIconToClose(lastWrongIcon[lastWrongIcon.length - 1]);
    }
  }
}

function createQuestionController() {
  var wrongAnswers = document.getElementsByClassName('wrong-answer');
  var wrongIcons = document.getElementsByClassName('wrong-icon');
  const addAnswerButton = document.querySelector('#add-answer');

  addAnswerButton.addEventListener('click', () => {
    if (wrongAnswers.length < 7) {
      addNewAnswer(wrongAnswers);
      changeIconToTrash(wrongIcons);
    }
  });
};

createQuestionController();
