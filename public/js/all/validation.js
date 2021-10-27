let eventValidator;

function validate(event, validator, hasEffects = false, formControlParam = formControl, btnSubmitSelector = 'button[type="submit"]') {
    eventValidator = event;

    // Get all validators
    const arrayValidations = validator.split("|");

    // Get form control node
    const formControlNode = eventValidator.target.attributes.formControl.nodeValue;

    // Set data to formControl
    formControlParam[formControlNode].value = eventValidator.target.value;
    formControlParam[formControlNode].validate = true;
    resetValidationInput(eventValidator);

    try {
        console.log(arrayValidations);
        for (let validation of arrayValidations) {
            const validationSplitted = validation.split(":");
            const method             = validationSplitted[0];
            const param              = validationSplitted[1];
            const stringFunction     = method + (param ? '('+param+')' : '()');
            eval(stringFunction)
        }
        
        if (hasEffects) {
            eventValidator.target.parentElement.classList.add("success-field");
            eventValidator.target.nextElementSibling.innerHTML = "";
        }
        
    } catch (e) {
        formControlParam[formControlNode].validate = false;
        if (hasEffects && eventValidator.type === 'blur') {
            eventValidator.target.parentElement.classList.add("failed-field");
            eventValidator.target.nextElementSibling.innerHTML = e.message;
        } else if (hasEffects) {
            eventValidator.target.parentElement.classList.add("focus-field");
        }
    } finally {
        applySubmitStatus(btnSubmitSelector, formControlParam);
    }
}

function required() {
    if (!eventValidator.target.value) {
        throw new Error('O campo '+ eventValidator.target.labels[0].textContent + ' não pode ser vazio');
    }
    return true;
}

function string() {
    if (typeof eventValidator.target.value !== 'string') {
        throw new Error('O campo '+ eventValidator.target.labels[0].textContent +' deve ser uma string');
    }
    return true;
}

function email() {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(eventValidator.target.value)) {
        throw new Error ('O campo ' + eventValidator.target.labels[0].textContent + ' deve ser um e-mail válido');
    }
    return true;
}

function min(minCharacters) {
    if (eventValidator.target.value.length < minCharacters) {
        throw new Error('O campo ' + eventValidator.target.labels[0].textContent + ' deve ter ao menos ' + minCharacters + ' caracteres')
    }
    return true;
}

function max(maxCharacters) {
    if (eventValidator.target.value.length < maxCharacters) {
        throw new Error('O campo ' + eventValidator.target.labels[0].textContent + ' deve ter no máximo ' + maxCharacters + ' caracteres')
    }
    return true;
}

function hasNoNumber() {
    const regex = /\d/;
    if (regex.test(eventValidator.target.value)) {
        throw new Error('O campo ' + eventValidator.target.labels[0].textContent + ' não pode conter números');
    }
    return true;

}

function hasNumber() {
    const regex = /\d/;
    if (!regex.test(eventValidator.target.value)) {
        throw new Error('O campo ' + eventValidator.target.labels[0].textContent + ' deve conter números');
    }
    return true;

}
function hasLetter() {
    const regex = /[a-zA-Z]/;
    if (!regex.test(eventValidator.target.value)) {
        throw new Error('O campo ' + eventValidator.target.labels[0].textContent + ' deve conter letras');
    }
    return true;
}

function isEqual(anotherDiv) {
    anotherDiv.blur();
    if (eventValidator.target.value !== anotherDiv.value) {
        throw new Error('O campo ' + 
            eventValidator.target.labels[0].textContent + 
            ' deve ser igual ao campo ' +
            anotherDiv.parentNode.childNodes[1].textContent
        );
    }
    return true;
}

function stalker(anotherDiv, formControlParam = formControl) {
    if (anotherDiv.value.length) {
        resetValidationInput(anotherDiv);
        if (anotherDiv.value !== eventValidator.target.value) {
            anotherDiv.parentElement.classList.add("failed-field");
            anotherDiv.nextElementSibling.innerHTML = 'O campo ' 
                + anotherDiv.parentNode.childNodes[1].textContent 
                + ' deve ser igual ao campo ' 
                + eventValidator.target.labels[0].textContent;
            formControlParam[anotherDiv.attributes.formControl.nodeValue].validate = false;
        } else {
            anotherDiv.nextElementSibling.innerHTML = "";
            anotherDiv.parentElement.classList.add("success-field");
            formControlParam[anotherDiv.attributes.formControl.nodeValue].validate = true;
        }
    }
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
 * Focus input
 *  
 */
function handleFocusInput(ev) {
    const actualClass = resetValidationInput(ev);

    if (actualClass === "success-field") {
        ev.target.parentElement.classList.add("success-field");
    } else {
        ev.target.parentElement.classList.add("focus-field");
    }
}
