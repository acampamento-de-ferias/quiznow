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

