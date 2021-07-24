/**
 * Init form control
 * 
 */
 const formControl = {
  email: {
      value: '',
  },
  password: {
      value: '',
  }
};

/**
 * Set formcontrol for each key
 *  
 */
function changeField(ev) {
    const formControlNode = ev.target.attributes.formControl.nodeValue;
    formControl[formControlNode].value = ev.target.value;
}

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

    // Show loading before request be finished
    const loading = document.getElementById("loading");
    openElement(loading);

    // Send data to backend using fetch
    fetch('/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        dataType: "json",
        mode: "same-origin",
        credentials: "same-origin",
        body: JSON.stringify(data)
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
        openElement(document.querySelector("#alert"), false, true);
        document.querySelector("#alert .alert-message").innerHTML = error.message;
        closeElementByTime(document.querySelector("#alert"), 4000);
    }).finally(function() {
        closeElement(loading);
    });

  }, false);