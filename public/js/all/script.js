/**
 * Set text or password to input with the respective eye icon
 * 
 */
function handleInputType(ev) {
    if (ev.target.classList.contains('fa-eye')) {
        ev.target.classList.remove('fa-eye');
        ev.target.classList.add('fa-eye-slash')
        ev.target.nextElementSibling.type = 'text';
    } else if (ev.target.classList.contains('fa-eye-slash')) {
        ev.target.classList.remove('fa-eye-slash')
        ev.target.classList.add('fa-eye');
        ev.target.nextElementSibling.type = 'password';
    }
}

/**
 * Reset fields after submit
 * 
 */
 window.onunload = function() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(function(input) {
        input.value = '';
        input.checked = false;
    });
}

/**
 * Open element instantly
 *  
 */
 function openElement(ev, hasHash = false, hasEffect = false) {
    const element = ev.target || ev;
    if (element.classList.contains('d-none') ||  element.classList.contains('hide-element')) {
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
 * Enable or disable button
 * @param {String} el 
 * @param {Boolean} value 
 */
function changeButtonState(el, value) {
    document.querySelector(el).disabled = value;
}
