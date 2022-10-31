const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small')
    small.innerText = message
}

// show input succes message
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// check email length
function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFeildName(input)} should be at least ${min} characters`)
    } else if(input.value.length > max) {
        showError(input, `${getFeildName(input)} should be less than or equal to ${max} characters`)
    } else {
        showSuccess(input)
    }
}

// check password match
function checkPasswordMatch(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2,'passwords do not match')
    }
}

// check valid email 
function checkEmail(input) {
    // email regex
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // check regex against input(email)
    if(regex.test(input.value.trim())){
        showSuccess(input)
    } else {
        showError(input, 'Email is not valid');
    }
}

// get input name
function getFeildName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// check required fields 
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if(input.value == '') {
            showError(input, `${getFeildName(input)} feild is required`);
        } else {
            showSuccess(input)
        }
    })
}

// Event Listener
form.addEventListener("submit", function(e) {
    e.preventDefault();

    
    checkRequired([username, email, password, password2])
    checkEmail(email)
    checkLength(username, 3, 15)
    checkLength(password, 6, 25)
    checkPasswordMatch(password, password2)
})