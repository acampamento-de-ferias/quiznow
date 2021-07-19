/**
 * Init form control
 * 
 */
 const formControl = {
  email: {
      value: '',
      validate: false
  },
  password: {
      value: '',
      validate: false
  }
};

/**
* Send data to backend
* 
*/
const formLogin = document.querySelector('#form-login');
  formLogin.addEventListener("submit", function(ev) {

    // Remove default http request 
    ev.preventDefault();

    // Get data in the form
    const data = {
        email: formControl.email.value,
        password: formControl.password.value
    };

    // Send data to backend using fetch
    fetch('/login', {
        method: 'POST',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json',
        },
        mode: "same-origin",
        credentials: "same-origin",
        body: JSON.stringify(data),
    }).then(function(response) {
        if (response.status !== 200) {
            throw new Error("Erro: não foi possível realizar sua requisição");
        }

        return response.json();
    }).then(function(body) {
        if (body.status === 400) {
            throw new Error(body.message);
        }

        window.location.href = url;
    }).catch(function(error) {
        alert(error.message);
    });

  }, false);