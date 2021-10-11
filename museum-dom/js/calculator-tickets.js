let radioInputs = document.querySelectorAll('.ticket-type__choice'),
    numberInputs = document.querySelectorAll('input[type="number"]'),
    amountTotalValue = document.querySelector('.amount__total-value');

setData();

const groupBasic = document.querySelector('.amount__calc-basic'),
      groupSenior = document.querySelector('.amount__calc-senior'),
      groupTicketChoice = document.querySelector('.ticket-type');

let amountValueBasic = document.querySelector('.amount__value-basic'),
    amountValueSenior = document.querySelector('.amount__value-senior');

groupBasic.addEventListener('click', function(event) {
    if (event.target.classList.contains('amount__button-left')) {
        changeTicketsValue('basic', -1);
        calcTotal();
    }
    if (event.target.classList.contains('amount__button-right')) {
        changeTicketsValue('basic', 1)
        calcTotal();
    }
});

groupSenior.addEventListener('click', function(event) {
    if (event.target.classList.contains('amount__button-left')) {
        changeTicketsValue('senior', -1)
        calcTotal();
    }
    if (event.target.classList.contains('amount__button-right')) {
        changeTicketsValue('senior', 1);
        calcTotal()
    }
});

groupBasic.addEventListener('change', function(event) {
    if (event.target.classList.contains('amount__value-basic')) {
        calcTotal()
    }
});

groupSenior.addEventListener('change', function(event) {
    if (event.target.classList.contains('amount__value-senior')) {
        calcTotal()
    }
});

groupTicketChoice.addEventListener('change', function(event) {
    if (event.target.classList.contains('ticket-type__choice')) {
        calcTotal()
    }
});

radioInputs.forEach(function(input) {
    input.addEventListener('change', function(event) {
        sessionStorage.setItem(`${event.target.name}`, `${event.target.value}`)
    });
}); 

function changeTicketsValue(age, x) {
    if ( age === 'basic') {
        let value = amountValueBasic.valueAsNumber + x;

        if (value < 0) amountValueBasic.valueAsNumber = 0
        else if (value > 20) amountValueBasic.valueAsNumber = 20
        else amountValueBasic.valueAsNumber = value
    }

    if ( age === 'senior') {
        let value = amountValueSenior.valueAsNumber + x;

        if (value < 0) amountValueSenior.valueAsNumber = 0
        else if (value > 20) amountValueSenior.valueAsNumber = 20
        else amountValueSenior.valueAsNumber = value
    }
};

function typeOfTicket() {
    let types = document.querySelectorAll('.ticket-type__choice');
    let ticketType;

    types.forEach( function(type) {
        if (type.checked) {
            ticketType = type.value;
        }
    });
    return ticketType
};

function calcTotal() {
    let ticketType = typeOfTicket(),
        ticketValueBasic = amountValueBasic.valueAsNumber,
        ticketValueSenior = amountValueSenior.valueAsNumber,
        costBasic,
        costSenior;

    if (ticketType === 'permanent') {
        costBasic = 20;
        costSenior = 10;
    } else if (ticketType === 'temporary') {
        costBasic = 25;
        costSenior = 12.5;
    } else if (ticketType === 'combined') {
        costBasic = 40;
        costSenior = 20;
    }

    let total = ticketValueBasic*costBasic  +  ticketValueSenior*costSenior;
    amountTotalValue.innerHTML = `${total}`;

    saveData([amountValueBasic, amountValueSenior, amountTotalValue])
};

function saveData(arr) {
    for (let elem of arr) {
        sessionStorage.setItem(`${elem.name}`, `${elem.value}`)

        if( !(elem.tagName === 'input')) {
            sessionStorage.setItem(`${elem.className}`, `${elem.innerHTML}`)  
        }
    }
};

function setData() {
    for (let input of radioInputs) {
        if (sessionStorage.getItem(`${input.name}`)  ) {
            if (input.value === sessionStorage.getItem(`${input.name}`)) {
                input.checked = true
            }
        }
    };
    for (let input of numberInputs) {
        if (sessionStorage.getItem(`${input.name}`)) {
            input.value = sessionStorage.getItem(`${input.name}`)
        }
    };
    if (sessionStorage.getItem(`${amountTotalValue.className}`)  ) {
        amountTotalValue.innerHTML = sessionStorage.getItem(`${amountTotalValue.className}`)
    }
};
