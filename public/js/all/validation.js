
/**
 * Validate input name
 * 
 */
function validateName(ev, minCharacteres) {

    // Get form control node
    const formControlNode = ev.target.attributes.formControl.nodeValue;

    // Set data to formControl
    formControl[formControlNode].value = ev.target.value;
    formControl[formControlNode].validate = true;

    // Remove focus styles
    if (ev.target.parentElement.classList.contains('focus-field')) {
        ev.target.parentElement.classList.remove("focus-field");
    }

    // Check if string has at least one number
    const regex = /\d/;
    if (regex.test(ev.target.value)) {
        ev.target.parentElement.classList.add("failed-field");
        ev.target.nextElementSibling.innerHTML = 'O campo nome não pode conter números';
        formControl[formControlNode].validate = false;
        return;
    }

    // Check if string has the minimum of characteres
    if (ev.target.value.length < minCharacteres) {
        ev.target.parentElement.classList.add("failed-field");
        ev.target.nextElementSibling.innerHTML = 'O campo nome deve ter ao menos ' + minCharacteres + ' caracteres';
        formControl[formControlNode].validate = false;
        return;
    }

    ev.target.parentElement.classList.add("success-field");
    applySubmitStatus();
    return true;
}

/**
* Validate input email
* 
*/
function validateEmail(ev) {

    // Get form control node
    const formControlNode = ev.target.attributes.formControl.nodeValue;

    // Set data to formControl
    formControl[formControlNode].value = ev.target.value;
    formControl[formControlNode].validate = true;

    // Remove focus styles
    if (ev.target.parentElement.classList.contains('focus-field')) {
        ev.target.parentElement.classList.remove("focus-field");
    }

    // Check if string is a valid email
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(ev.target.value)) {
        ev.target.parentElement.classList.add("failed-field");
        ev.target.nextElementSibling.innerHTML = 'O campo e-mail deve ser um e-mail válido';
        formControl[formControlNode].validate = false;
        return;
    }

    ev.target.parentElement.classList.add("success-field");
    applySubmitStatus();
    return true;
}

/**
* Validate password
* 
*/
function validatePassword(ev, minCharacteres) {

    // Get form control node
    const formControlNode = ev.target.attributes.formControl.nodeValue;

    // Set data to formControl
    formControl[formControlNode].value = ev.target.value;
    formControl[formControlNode].validate = true;

    // Remove focus styles
    if (ev.target.parentElement.classList.contains('focus-field')) {
        ev.target.parentElement.classList.remove("focus-field");
    }

    const regexNumber = /\d/;
    const regexLetter = /[a-zA-Z]/;

    // Check if string has at least one number
    if (!regexNumber.test(ev.target.value)) {
        ev.target.parentElement.classList.add("failed-field");
        formControl[formControlNode].validate = false;
        ev.target.nextElementSibling.innerHTML = 'O campo senha deve conter ao menos um número';
        return;
    }

    // Check if string has at least one letter
    if (!regexLetter.test(ev.target.value)) {
        ev.target.parentElement.classList.add("failed-field");
        formControl[formControlNode].validate = false;
        ev.target.nextElementSibling.innerHTML = 'O campo senha deve conter ao menos uma letra';
        return;
    }

    // Check if string has the minimum of characteres
    if (ev.target.value.length < minCharacteres) {
        ev.target.parentElement.classList.add("failed-field");
        ev.target.nextElementSibling.innerHTML = 'O campo senha deve conter ao menos ' + minCharacteres + ' caracteres';
        formControl[formControlNode].validate = false;
        return;
    }

    ev.target.parentElement.classList.add("success-field");
    applySubmitStatus();
    return true;
}

/**
* Validate password confirmation
* 
*/
function validatePasswordConfirmation(ev, minCharacteres) {

    // Get form control node
    const formControlNode = ev.target.attributes.formControl.nodeValue;

    // Set data to formControl
    formControl[formControlNode].value = ev.target.value;
    formControl[formControlNode].validate = true;

    // Remove focus styles
    if (ev.target.parentElement.classList.contains('focus-field')) {
        ev.target.parentElement.classList.remove("focus-field");
    }

    // Check if string is a valid password
    if (!validatePassword(ev, minCharacteres)) {
        formControl[formControlNode].validate = false;
        return;
    }

    // Check if password is equals than confirm password
    if (document.getElementById("registerPassword").value !== ev.target.value) {
        ev.target.parentElement.classList.add("failed-field");
        formControl[formControlNode].validate = false;
        ev.target.nextElementSibling.innerHTML = 'O campo confirmar senha deve ser igual ao campo senha';
        return;
    }

    ev.target.parentElement.classList.add("success-field");
    applySubmitStatus();
    return true;
}

/**
* Apply submit button status
* 
*/
function applySubmitStatus() {
    const button = document.querySelector('button[type="submit"]');
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
    if (ev.target.parentElement.classList.contains('failed-field')) {
        ev.target.parentElement.classList.remove("failed-field");
        ev.target.nextElementSibling.innerHTML = '';
    }
    if (ev.target.parentElement.classList.contains('success-field')) {
        ev.target.parentElement.classList.remove("success-field");
    }
}

/**
* Focus input
*  
*/
function handleFocusInput(ev) {
    resetValidationInput(ev);
    ev.target.parentElement.classList.add("focus-field");
}