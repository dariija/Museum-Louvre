const formInputs = document.querySelectorAll('.form__input'),
      formArea = document.querySelector('.modal__inner');

formArea.addEventListener('click', function() {
    let errors = document.querySelectorAll('.tooltip');
    for (let error of errors) {
        error.remove()
    };
});

for (let input of formInputs) {
    input.addEventListener('input', function() {
        removeError(input);
        checkInput(input);
    })
};

function checkInput(input) {
    let pattern;

    if (input.type === 'text') {
        pattern = /([A-zА-я]{3,15})/g;

        if (!input.value.match(pattern)) {
            input.classList.add('no-valid');
            showError(input);
        }
    }
    if (input.type === 'email') {
        pattern = /[A-Za-z0-9_-]{3,15}@[A-z]{4,}\.[A-z]{2,}/g;

        if (!input.value.match(pattern)) {
            input.classList.add('no-valid');
            showError(input);
        }
    }
    if (input.type === 'tel') {
        pattern = /\d{2,3}[-\s]?\d{2,3}[-\s]?\d{2,3}[-\s]?\d{2,3}[-\s]?\d{2,3}/g;

        if (!input.value.match(pattern) || input.value.length > 10) {
            input.classList.add('no-valid');
            showError(input);
        }
    }
};

function showError(input) {
    let error = document.createElement('div');
    error.classList.add('tooltip','tooltip__text', 'tooltip::before');
 
    if (input.type === 'text') {
        error.innerHTML = 'The name must be between 3-15 characters. It is allowed to use letters of the Russian or English alphabet, spaces';
        input.parentElement.appendChild(error, input);
    }

    if (input.type === 'email') {
        error.innerHTML = 'Email can`t be less than 10 characters';
        input.parentElement.appendChild(error, input);
    }

    if (input.type === 'tel') {
        error.innerHTML = 'Phone number can`t be more than 10 characters and contains only numbers';
        input.parentElement.appendChild(error, input);
    }
}

function removeError(input) {
    let errors = document.querySelectorAll('.tooltip');
    for (let error of errors) {
        error.remove()
    };
    input.classList.remove('no-valid');
}
