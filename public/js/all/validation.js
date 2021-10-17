/**
 * Validate input name on blur
 * 
 */
function validateName(ev, minCharacters, type) {
    
    // Get form control node
    const formControlNode = ev.target.attributes.formControl.nodeValue;

    // Do not validate empty input
    if (refuseValidationOnEmptyValue(ev, formControlNode, 'button[type="submit"]')) return;

    // Set data to formControl
    formControl[formControlNode].value = ev.target.value;
    formControl[formControlNode].validate = true;
    resetValidationInput(ev);

    // Check if string has at least one number
    const regex = /\d/;
    if (regex.test(ev.target.value)) {
        if (type === 'blur') {
            ev.target.parentElement.classList.add("failed-field");
            ev.target.nextElementSibling.innerHTML = 'O campo nome não pode conter números';
        } else {
            ev.target.parentElement.classList.add("focus-field");
        }
        formControl[formControlNode].validate = false;
        changeButtonState('button[type="submit"]', true);
        return;
    }

    // Check if string has the minimum of characters
    if (ev.target.value.length < minCharacters) {
        if (type === 'blur') {
            ev.target.parentElement.classList.add("failed-field");
            ev.target.nextElementSibling.innerHTML = 'O campo nome deve ter ao menos ' + minCharacters + ' caracteres';
        } else {
            ev.target.parentElement.classList.add("focus-field");
            ev.target.nextElementSibling.innerHTML = "";
        }
        formControl[formControlNode].validate = false;
        changeButtonState('button[type="submit"]', true);
        return;
    }

    ev.target.parentElement.classList.add("success-field");
    ev.target.nextElementSibling.innerHTML = "";
    applySubmitStatus('button[type="submit"]');
    return true;
}

/**
* Validate input email
* 
*/
function validateEmail(ev, type) {

    // Get form control node
    const formControlNode = ev.target.attributes.formControl.nodeValue;

    // Do not validate empty input
    if (refuseValidationOnEmptyValue(ev, formControlNode, 'button[type="submit"]')) return;

    // Set data to formControl
    formControl[formControlNode].value = ev.target.value;
    formControl[formControlNode].validate = true;
    resetValidationInput(ev);

    // Check if string is a valid email
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(ev.target.value)) {
        if (type === 'blur') {
            ev.target.parentElement.classList.add("failed-field");
            ev.target.nextElementSibling.innerHTML = 'O campo e-mail deve ser um e-mail válido';
        } else {
            ev.target.parentElement.classList.add("focus-field");
            ev.target.nextElementSibling.innerHTML = "";
        }
        formControl[formControlNode].validate = false;
        changeButtonState('button[type="submit"]', true);
        return;
    }

    ev.target.parentElement.classList.add("success-field");
    ev.target.nextElementSibling.innerHTML = "";
    applySubmitStatus('button[type="submit"]');
    return true;
}

/**
* Validate password
* 
*/
function validatePassword(ev, minCharacters, type, formControlPasswordConfirmationNode = false) {

    // Get form control node
    const formControlNode = ev.target.attributes.formControl.nodeValue;

    // Do not validate empty input
    if (refuseValidationOnEmptyValue(ev, formControlNode, 'button[type="submit"]')) return;

    // Set data to formControl
    formControl[formControlNode].value = ev.target.value;
    formControl[formControlNode].validate = true;
    resetValidationInput(ev);

    const regexNumber = /\d/;
    const regexLetter = /[a-zA-Z]/;

    // Apply changes to force verification on confirmation password
    if (formControlPasswordConfirmationNode) {
        const passwordConfirmation = document.querySelector(`[formControl=${formControlPasswordConfirmationNode}]`);
        if (passwordConfirmation.value.length) {
            resetValidationInput(passwordConfirmation);
            if (passwordConfirmation.value !== ev.target.value) {
                passwordConfirmation.parentElement.classList.add("failed-field");
                passwordConfirmation.nextElementSibling.innerHTML = 'O campo confirmar senha deve ser igual ao campo senha';
                formControl[formControlPasswordConfirmationNode].validate = false;
                changeButtonState('button[type="submit"]', true);
            } else {
                passwordConfirmation.nextElementSibling.innerHTML = "";
                passwordConfirmation.parentElement.classList.add("success-field");
                formControl[formControlPasswordConfirmationNode].validate = true;
                applySubmitStatus('button[type="submit"]');
            }
        }
        
    }

    // Check if string has at least one number
    if (!regexNumber.test(ev.target.value)) {
        if (type === 'blur') {
            ev.target.parentElement.classList.add("failed-field");
            ev.target.nextElementSibling.innerHTML = 'O campo senha deve conter ao menos um número';
        } else {
            ev.target.parentElement.classList.add("focus-field");
            ev.target.nextElementSibling.innerHTML = "";
        }
        formControl[formControlNode].validate = false;
        changeButtonState('button[type="submit"]', true);
        return;
    }

    // Check if string has at least one letter
    if (!regexLetter.test(ev.target.value)) {
        if (type === 'blur') {
            ev.target.parentElement.classList.add("failed-field");
            ev.target.nextElementSibling.innerHTML = 'O campo senha deve conter ao menos uma letra';
        } else {
            ev.target.parentElement.classList.add("focus-field");
            ev.target.nextElementSibling.innerHTML = "";
        }
        formControl[formControlNode].validate = false;
        changeButtonState('button[type="submit"]', true);
        return;
    }

    // Check if string has the minimum of characters
    if (ev.target.value.length < minCharacters) {
        if (type === 'blur') {
            ev.target.parentElement.classList.add("failed-field");
            ev.target.nextElementSibling.innerHTML = 'O campo senha deve conter ao menos ' + minCharacters + ' caracteres';
        } else {
            ev.target.parentElement.classList.add("focus-field");
            ev.target.nextElementSibling.innerHTML = "";
        }
        formControl[formControlNode].validate = false;
        changeButtonState('button[type="submit"]', true);
        return;
    }

    ev.target.nextElementSibling.innerHTML = "";
    ev.target.parentElement.classList.add("success-field");
    applySubmitStatus('button[type="submit"]');
    return true;
}

/**
* Validate password confirmation
* 
*/
function validatePasswordConfirmation(ev, type) {

    // Get form control node
    const formControlNode = ev.target.attributes.formControl.nodeValue;

    // Do not validate empty input
    if (refuseValidationOnEmptyValue(ev, formControlNode, 'button[type="submit"]')) return;

    // Set data to formControl
    formControl[formControlNode].value = ev.target.value;
    formControl[formControlNode].validate = true;
    resetValidationInput(ev);

    // Check if password is equals than confirm password
    if (document.getElementById("registerPassword").value !== ev.target.value) {
        if (type === 'blur') {
            ev.target.parentElement.classList.add("failed-field");
            ev.target.nextElementSibling.innerHTML = 'O campo confirmar senha deve ser igual ao campo senha';
        } else {
            ev.target.parentElement.classList.add("focus-field");
            ev.target.nextElementSibling.innerHTML = "";
        }
        formControl[formControlNode].validate = false;
        changeButtonState('button[type="submit"]', true);
        return;
    }

    ev.target.nextElementSibling.innerHTML = "";
    ev.target.parentElement.classList.add("success-field");
    applySubmitStatus('button[type="submit"]');
    return true;
}

/**
 * Validate input title on blur
 * @param {Object} ev 
 * @param {Number} minCharacters 
 * @param {String} type 
 */
 function validateTitle(ev, minCharacters, type) {
    // Get form control node
    const formControlNode = ev.target.attributes.formControl.nodeValue;

    // Do not validate empty input
    if (refuseValidationOnEmptyValue(ev, formControlNode, '.actions-section button')) return;

    // Set data to formControl
    formControl[formControlNode].value = ev.target.value;
    formControl[formControlNode].validate = true;
    resetValidationInput(ev);

    // Check if string has the minimum of characters
    if (ev.target.value.length < minCharacters) {
        if (type === 'blur') {
            ev.target.parentElement.classList.add("failed-field");
            ev.target.nextElementSibling.innerHTML = 'O campo título deve ter ao menos ' + minCharacters + ' caracteres';
        } else {
            ev.target.parentElement.classList.add("focus-field");
            ev.target.nextElementSibling.innerHTML = '';
        }
        formControl[formControlNode].validate = false;
        changeButtonState('.actions-section button', true);
        return;
    }

    ev.target.parentElement.classList.add('success-field');
    ev.target.nextElementSibling.innerHTML = '';
    applySubmitStatus('.actions-section button');
    validateList('answer', 'answers');
    return true;
}

/**
 * Validate each input from a list
 * @param {Object} ev 
 * @param {String} className 
 * @param {String} formControlNode 
 * @returns 
 */
function validateList(className, formControlNode, ev) {
    const elementsList = document.getElementsByClassName(className);
    let isEmpty = false;

    for (let i = 0; i < elementsList.length; i++) {
        formControl[formControlNode][i].value = elementsList[i].firstElementChild.value;
        // Do not validate empty input
        if (!elementsList[i].firstElementChild.value.length) {
            formControl[formControlNode][i].validate = false;
            isEmpty = true;
        } else {
            formControl[formControlNode][i].validate = true;
        }
    }

    if (ev) {
        resetValidationInput(ev);
    }

    if (isEmpty) {
        changeButtonState('.actions-section button', true);
        return;
    }
    
    changeButtonState('.actions-section button', false);
    return true;
}

/**
* Apply submit button status
* 
*/
function applySubmitStatus(sel) {
    const button = document.querySelector(sel);
    let disabled = true;
    for (const property in formControl) {
        if (!formControl[property].validate) {
            disabled = false;
        }
    }
    button.disabled = !disabled;
}

/**
* Reset validation input
* 
*/
function resetValidationInput(ev) {
    const element = ev.target ? ev.target : ev;
    if (element.parentElement.classList.contains('failed-field')) {
        element.parentElement.classList.remove("failed-field");
        element.nextElementSibling.innerHTML = '';
        return "failed-field";
    }
    if (element.parentElement.classList.contains('success-field')) {
        element.parentElement.classList.remove("success-field");
        return "success-field";
    }
    if (element.parentElement.classList.contains('focus-field')) {
        element.parentElement.classList.remove("focus-field");
        return "focus-field";
    }

    return;
}

/**
 * 
 * Do not validate empty input
 */
 function refuseValidationOnEmptyValue(ev, formControlNode, sel) {
    let isEmpty = false;
    if (!ev.target.value.length) {
        formControl[formControlNode].value = ev.target.value;
        formControl[formControlNode].validate = false;
        resetValidationInput(ev);
        applySubmitStatus(sel);
        isEmpty = true;
    }
    
    return isEmpty;
}

/**
* Focus input
*  
*/
function handleFocusInput(ev) {
    const actualClass = resetValidationInput(ev);
        if (!ev.target.value.length) return;

    if (actualClass === "success-field") {
        ev.target.parentElement.classList.add("success-field");
    } else {
        ev.target.parentElement.classList.add("focus-field");
    }
}