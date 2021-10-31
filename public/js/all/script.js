/**
 * Set text or password to input with the respective eye icon
 *
 */
function handleInputType(ev) {
  if (ev.target.classList.contains('fa-eye')) {
    ev.target.classList.remove('fa-eye');
    ev.target.classList.add('fa-eye-slash');
    ev.target.nextElementSibling.type = 'text';
  } else if (ev.target.classList.contains('fa-eye-slash')) {
    ev.target.classList.remove('fa-eye-slash');
    ev.target.classList.add('fa-eye');
    ev.target.nextElementSibling.type = 'password';
  }
}

/**
 * Reset fields after submit
 *
 */
window.onunload = function () {
  clearAllInputs();
};

function clearAllInputs(sel = '') {
  const inputs = document.querySelectorAll(sel + 'input');
  const textareas = document.querySelectorAll(sel + 'textarea');
  inputs.forEach(function (input) {
    input.value = '';
    input.checked = false;
  });
  textareas.forEach(function (textarea) {
    textarea.value = '';
    textarea.checked = false;
  });
}

/**
 * Open element instantly
 *
 */
function openElement(ev, hasHash = false, hasEffect = false) {
  const element = ev.target || ev;
  if (element.classList.contains('d-none') || element.classList.contains('hide-element')) {
    element.classList.remove(hasEffect ? 'hide-element' : 'd-none');
    if (hasEffect) {
      element.classList.add('show-element');
    }
  }

  if (hasHash) {
    element.setAttribute('hash', generateHash());
  }
}

/**
 * Close element instantly
 *
 */
function closeElement(ev, hash = '', hasEffect = false) {
  const element = ev.target || ev;

  // Return element already closed
  if (element.classList.contains('d-none') || element.classList.contains('hide-element')) {
    return;
  }

  // Remove element with effect
  if (hasEffect) {
    element.classList.remove('show-element');
  }

  // Close element without hash
  if (hash === '') {
    element.classList.add(hasEffect ? 'hide-element' : 'd-none');
    return;
  }

  // Close element with hash
  const hashAttribute = element.hasAttribute('hash') ? element.getAttribute('hash') : '';
  if (hash === hashAttribute) {
    element.setAttribute('hash', hash);
    element.classList.add(hasEffect ? 'hide-element' : 'd-none');
    return;
  }
}

/**
 * Close element after defined time
 *
 */
function closeElementByTime(ev, time) {
  const element = ev.target || ev;
  const hash = generateHash();
  element.setAttribute('hash', hash);
  setTimeout(() => {
    closeElement(element, hash, true);
  }, time);
}

/**
 * Generate hash by timestamp
 *
 */
function generateHash() {
  return new Date().getUTCMilliseconds().toString();
}

/**
 * Open default modal
 *
 */
function openModal(elementId) {
  document.getElementById('backdrop').classList.remove('d-none');
  document.getElementById(elementId).style.display = 'block';
  document.getElementById(elementId).classList.add('show');
}

/**
 * Close default modal
 *
 */
function closeModal(elementId) {
  document.getElementById('backdrop').classList.add('d-none');
  document.getElementById(elementId).style.display = 'none';
  document.getElementById(elementId).classList.remove('show');
}

/**
 * When the user clicks anywhere outside of the modal, close it
 *
 */
window.onclick = function (event) {
  const modals = document.getElementsByClassName('custom-modal');
  for (element of modals) {
    const elementId = element.getAttribute('id');
    if (event.target == document.getElementById(elementId)) {
      closeModal(elementId);
    }
  }
};

/**
 * Change page (hide/show div) by javascript
 *
 */
function changeDisplayById(idToHide, idToShow) {
  document.getElementById(idToShow).classList.add('d-block');
  document.getElementById(idToShow).classList.remove('d-none');

  document.getElementById(idToHide).classList.add('d-none');
  document.getElementById(idToHide).classList.remove('d-block');
}

/**
 * Show dropdown menu
 */
function displayDropdown(el) {
  el.parentElement.nextElementSibling.classList.toggle('show');
}

document.addEventListener('click', function (event) {
  const dropdownMenu = document.querySelectorAll('.dropdown-menu');
  const configButton = document.querySelectorAll('.more-bg button');
  for (let idx = 0; idx < dropdownMenu.length; idx++) {
    if (!configButton[idx].contains(event.target)) {
      dropdownMenu[idx].className.includes('show')
        ? dropdownMenu[idx].classList.remove('show')
        : '';
    }
  }
});
