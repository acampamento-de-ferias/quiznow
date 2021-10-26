/**
 * Validate input name on blur
 * 
 */
function validateName(ev, minCharacters, type, formControlParam = formControl, btnSubmitSelector = 'button[type="submit"]') {

    // Get form control node
    const formControlNode = ev.target.attributes.formControl.nodeValue;

    // Do not validate empty input
    if (refuseValidationOnEmptyValue(ev, formControlNode, btnSubmitSelector, formControlParam)) return;

    // Set data to formControl
    formControlParam[formControlNode].value = ev.target.value;
    formControlParam[formControlNode].validate = true;
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
        formControlParam[formControlNode].validate = false;
        applySubmitStatus(btnSubmitSelector, formControlParam);
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
        formControlParam[formControlNode].validate = false;
        applySubmitStatus(btnSubmitSelector, formControlParam);
        return;
    }

    ev.target.parentElement.classList.add("success-field");
    ev.target.nextElementSibling.innerHTML = "";
    applySubmitStatus(btnSubmitSelector, formControlParam);
    return true;
}

/**
 * Validate input email
 * 
 */
function validateEmail(ev, type, formControlParam = formControl, btnSubmitSelector = 'button[type="submit"]') {

    // Get form control node
    const formControlNode = ev.target.attributes.formControl.nodeValue;

    // Do not validate empty input
    if (refuseValidationOnEmptyValue(ev, formControlNode, btnSubmitSelector, formControlParam)) return;

    // Set data to formControl
    formControlParam[formControlNode].value = ev.target.value;
    formControlParam[formControlNode].validate = true;
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
        formControlParam[formControlNode].validate = false;
        applySubmitStatus(btnSubmitSelector, formControlParam);
        return;
    }

    ev.target.parentElement.classList.add("success-field");
    ev.target.nextElementSibling.innerHTML = "";
    applySubmitStatus(btnSubmitSelector, formControlParam);
    return true;
}

/**
 * Validate password
 * 
 */
function validatePassword(ev, minCharacters, type, formControlPasswordConfirmationNode = false, formControlParam = formControl, btnSubmitSelector = 'button[type="submit"]') {

    // Get form control node
    const formControlNode = ev.target.attributes.formControl.nodeValue;

    // Do not validate empty input
    if (refuseValidationOnEmptyValue(ev, formControlNode, btnSubmitSelector, formControlParam)) return;

    // Set data to formControl
    formControlParam[formControlNode].value = ev.target.value;
    formControlParam[formControlNode].validate = true;
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
                formControlParam[formControlPasswordConfirmationNode].validate = false;
                applySubmitStatus(btnSubmitSelector, formControlParam);
            } else {
                passwordConfirmation.nextElementSibling.innerHTML = "";
                passwordConfirmation.parentElement.classList.add("success-field");
                formControlParam[formControlPasswordConfirmationNode].validate = true;
                applySubmitStatus(btnSubmitSelector, formControlParam);
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
        formControlParam[formControlNode].validate = false;
        applySubmitStatus(btnSubmitSelector, formControlParam);
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
        formControlParam[formControlNode].validate = false;
        applySubmitStatus(btnSubmitSelector, formControlParam);
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
        formControlParam[formControlNode].validate = false;
        applySubmitStatus(btnSubmitSelector, formControlParam);
        return;
    }

    ev.target.nextElementSibling.innerHTML = "";
    ev.target.parentElement.classList.add("success-field");
    applySubmitStatus(btnSubmitSelector, formControlParam);
    return true;
}

/**
 * Validate password confirmation
 * 
 */
function validatePasswordConfirmation(ev, type, formControlParam = formControl, btnSubmitSelector = 'button[type="submit"]') {

    // Get form control node
    const formControlNode = ev.target.attributes.formControl.nodeValue;

    // Do not validate empty input
    if (refuseValidationOnEmptyValue(ev, formControlNode, btnSubmitSelector, formControlParam)) return;

    // Set data to formControl
    formControlParam[formControlNode].value = ev.target.value;
    formControlParam[formControlNode].validate = true;
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
        formControlParam[formControlNode].validate = false;
        applySubmitStatus(btnSubmitSelector, formControlParam);
        return;
    }

    ev.target.nextElementSibling.innerHTML = "";
    ev.target.parentElement.classList.add("success-field");
    applySubmitStatus(btnSubmitSelector, formControlParam);
    return true;
}

/**
 * Validate input title on blur
 * @param {Object} ev 
 * @param {Number} minCharacters 
 * @param {String} type 
 */
// '.actions-section button'
function validateTitle(ev, minCharacters, type, formControlParam = formControl, btnSubmitSelector = 'button[type="submit"]') {
    // Get form control node
    const formControlNode = ev.target.attributes.formControl.nodeValue;

    // Do not validate empty input
    if (refuseValidationOnEmptyValue(ev, formControlNode, btnSubmitSelector, formControlParam)) return;

    // Set data to formControl
    formControlParam[formControlNode].value = ev.target.value;
    formControlParam[formControlNode].validate = true;

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
        formControlParam[formControlNode].validate = false;
        applySubmitStatus(btnSubmitSelector, formControlParam);
        return;
    }

    ev.target.parentElement.classList.add('success-field');
    ev.target.nextElementSibling.innerHTML = '';
    applySubmitStatus(btnSubmitSelector, formControlParam);
    return true;
}

/**
 * Apply submit button status
 * 
 */
function applySubmitStatus(sel, formControlParam) {
    const button = document.querySelector(sel);
    let disabled = true;
    for (const property in formControlParam) {
        if (!formControlParam[property].validate) {
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
        element.parentElement.classList.remove('focus-field');
        return 'focus-field';
    }

    return;
}

/**
 * 
 * Do not validate empty input
 */
function refuseValidationOnEmptyValue(ev, formControlNode, sel, formControlParam) {
    let isEmpty = false;
    if (!ev.target.value.length) {
        formControlParam[formControlNode].value = ev.target.value;
        formControlParam[formControlNode].validate = false;
        resetValidationInput(ev);
        applySubmitStatus(sel, formControlParam);
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

/**
 * Set formcontrol for each key
 *  
 */
function changeFieldWithoutValidation(ev, formControlParam = formControl) {
    const formControlNode = ev.target.attributes.formControl.nodeValue;
    formControlParam[formControlNode].value = ev.target.value;
}
