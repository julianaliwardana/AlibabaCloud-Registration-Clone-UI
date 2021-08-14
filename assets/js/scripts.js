const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('confirm-password');
const checkbox = document.getElementById('verify');
const confirmBtn = document.getElementById('confirmBtn');

checkbox.onchange = function(){
	if(this.checked){
		confirmBtn.disabled = false;
	} else {
		confirmBtn.disabled = true;
	}
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    validate();
});

function validate() {
	validateEmail();
	validatePassword();
	validatePassword2();
}

function validateEmail() {
	const emailValue = email.value.trim();

    if(emailValue === '') {
        showError(email, 'Please enter your email.')
    } else if (!isEmail(emailValue)) {
		showError(email, 'Please enter a valid email address that consists of only letters, numbers, periods, and the @ sign.');
	} else {
		showSuccess(email);
	}
}

function validatePassword() {
	const passwordValue = password.value.trim();

    if(passwordValue === '') {
		showError(password, 'Please enter your password.');
	} else if (passwordValue.length < 8 || passwordValue.length > 20) {
		showError(password, 'Invalid Password (Please enter a valid password that consists 8 - 20 characters)');
	} else if (passwordValue.search(/[0-9]/gi) === -1) {
		showError(password, 'Invalid Password (Please enter a valid password that consists 1 numeric characters)');
	} else if (passwordValue.search(/[a-z]/gi) === -1 || passwordValue.search(/[A-Z]/gi) === -1) {
		showError(password, 'Invalid Password (Password must be consists 1 uppercase, lowercase or special characters)');
	} else {
		showSuccess(password);
	}
}

function validatePassword2() {
	const password2Value = password2.value.trim();
	const passwordValue = password.value.trim();

    if(password2Value === '') {
		showError(password2, 'Please enter your password.');
	} else if(passwordValue !== password2Value) {
		showError(password2, 'Passwords does not match');
	} else if(password2Value === passwordValue) {
		showSuccess(password2);
	}
}

function showSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}

function showError(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}