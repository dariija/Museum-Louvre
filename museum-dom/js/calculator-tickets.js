let radioInputs = document.querySelectorAll('.ticket-type__choice'),
    amountTotalValue = document.querySelectorAll('.amount__total-value, .form__cost-total-price');

const groupBasic = document.querySelectorAll('.basic-tickets'),
      groupSenior = document.querySelectorAll('.senior-tickets'),
      groupTicketChoice = document.querySelector('.ticket-type');

let amountValueBasic = document.querySelectorAll('.amount__value-basic, .basic-tickets-value'),
    amountValueSenior = document.querySelectorAll('.amount__value-senior, .senior-tickets-value');

const modalSelectOptionsTicket = document.querySelector('.form__select-ticket');
const overviewTicketOption = document.querySelector('.form__overview-ticket'),
      overviewBasicTicketsQuantity = document.querySelector('.form__cost-basic'),
      overviewSeniorTicketsQuantity = document.querySelector('.form__cost-senior'),
      overviewBasicTicketsCost = document.querySelector('.form__cost-basic-price'),
      overviewSeniorTicketsCost = document.querySelector('.form__cost-senior-price');

const basicTicketCost =  document.querySelectorAll('.form__tickets-age-price_basic, .form__cost-basic-cost');
const seniorTicketCost =  document.querySelectorAll('.form__tickets-age-price_senior, .form__cost-senior-cost');

const dateInput = document.querySelector('.form__input_date'),
      timeInput = document.querySelector('.form__input_time'),
      overviewDate= document.querySelector('.form__overview-date'),
      overviewTime= document.querySelector('.form__overview-time');

dateInput.addEventListener('change', (e) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    overviewDate.textContent = new Intl.DateTimeFormat('en-US', options).format(new Date(e.target.value))
    saveData([ dateInput])
})

timeInput.addEventListener('change', (e) => {
    console.log('timeInput');
    overviewTime.textContent = (e.target.value).split(':').join(' : ')
    saveData([ timeInput])
})

groupBasic.forEach((item) => {
    item.addEventListener('click', function(event) {
        if (event.target.classList.contains('button-left')) {
            changeTicketsValue('basic', -1);
        }
        if (event.target.classList.contains('button-right')) {
            changeTicketsValue('basic', 1)
        }
        calcTotal();
    })
})

groupSenior.forEach((item) => {
    item.addEventListener('click', function(event) {
        if (event.target.classList.contains('button-left')) {
            changeTicketsValue('senior', -1)
        }
        if (event.target.classList.contains('button-right')) {
            changeTicketsValue('senior', 1);
        }
        calcTotal()
    })

});

groupTicketChoice.addEventListener('change', function(event) {
        calcTotal()
});

radioInputs.forEach(function(input) {
    input.addEventListener('change', function(event) {
        sessionStorage.setItem(`${event.target.name}`, `${event.target.value}`);
        changeTicketsCost(event.target.value);
        for (let i = 0; i < modalSelectOptionsTicket.length; i++) {
            modalSelectOptionsTicket[i].selected = (modalSelectOptionsTicket[i].value === event.target.value);
        };
        overviewTicketOption.textContent = event.target.labels[0].textContent;
    });
}); 

modalSelectOptionsTicket.addEventListener('change', function(event) {
    radioInputs.forEach((input) => {
        sessionStorage.setItem(`${event.target.name}`, `${event.target.value}`);
        changeTicketsCost(event.target.value);
        input.checked = (input.value === event.target.value);
        if (input.checked) overviewTicketOption.textContent = input.labels[0].textContent;
    });
});

setData();

function changeTicketsCost(ticketType) {
    const [costBasic, costSenior] = exploreTicketCost(ticketType);
    basicTicketCost.forEach((el) => el.textContent = `(${costBasic} €)`);
    seniorTicketCost.forEach((el) => el.textContent = `(${costSenior} €)`);
    saveData([ basicTicketCost[0], seniorTicketCost[0]])
}

function changeTicketsValue(age, x) {
    if ( age === 'basic') {
        amountValueBasic.forEach((item) => {
            item.valueAsNumber = calcTicketsValue(item.valueAsNumber + x);
            overviewBasicTicketsQuantity.dataset.before = item.valueAsNumber;
        });
    }

    if ( age === 'senior') {
        amountValueSenior.forEach((item) => {
            item.valueAsNumber = calcTicketsValue(item.valueAsNumber + x);
            overviewSeniorTicketsQuantity.dataset.before = item.valueAsNumber;
        });
    }
};

function calcTicketsValue(value) {
    if (value <= 0) return 0
    else if (value >= 20) return 20
    else return value
}

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
        ticketValueBasic = overviewBasicTicketsQuantity.dataset.before,
        ticketValueSenior = overviewSeniorTicketsQuantity.dataset.before,
        [costBasic, costSenior] = exploreTicketCost(ticketType);

    const fullPriceBasicTickets = ticketValueBasic * costBasic;
    const fullPriceSeniorTickets = ticketValueSenior * costSenior;
    const total = fullPriceBasicTickets + fullPriceSeniorTickets;
    overviewBasicTicketsCost.textContent =  `${fullPriceBasicTickets} €`;
    overviewSeniorTicketsCost.textContent =  `${fullPriceSeniorTickets} €`;
    amountTotalValue.forEach((el) => el.innerHTML = `${total}`);

    saveData([amountValueBasic[0], amountValueSenior[0], amountTotalValue[0], basicTicketCost[0], seniorTicketCost[0], overviewBasicTicketsCost, overviewSeniorTicketsCost])
};

function exploreTicketCost(ticketType) {
    if (ticketType === 'permanent') return [20, 10]
    else if (ticketType === 'temporary') return [25, 12.5]
    else if (ticketType === 'combined') return [40, 20]
}

function saveData(arr) {
    for (let elem of arr) {
        if ( elem.dataset.costTickets === 'total') {
            sessionStorage.setItem('totalPrice', `${elem.innerHTML}`)  
        } else if (elem.classList.contains('form__cost-basic-price')) {
            sessionStorage.setItem('totalBasicPrice', `${elem.textContent}`)  
        } else if (elem.classList.contains('form__cost-senior-price')) {
            sessionStorage.setItem('totalSeniorPrice', `${elem.textContent}`)  
        } else if (elem.classList.contains('form__tickets-age-price_basic')) {
            sessionStorage.setItem('costBasicTicket', `${elem.textContent}`)  
        } else if (elem.classList.contains('form__tickets-age-price_senior')) {
            sessionStorage.setItem('costSeniorTicket', `${elem.textContent}`)  
        } else sessionStorage.setItem(`${elem.name}`, `${elem.value}`)
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
    for (let i = 0; i < modalSelectOptionsTicket.length; i++) {
        if (sessionStorage.getItem(`${modalSelectOptionsTicket.name}`)) {
            modalSelectOptionsTicket[i].selected = (modalSelectOptionsTicket[i].value === sessionStorage.getItem(`${modalSelectOptionsTicket.name}`));
        }
    };
    if (sessionStorage.getItem('ticket-type')) {
        const ticketType = sessionStorage.getItem('ticket-type');
        overviewTicketOption.textContent = ticketType === 'permanent'? 'Permanent exhibition' : ticketType === 'temporary'? 'Temporary exhibition' : 'Combined Admission'
    };
    amountValueBasic.forEach((el) => {
        if (sessionStorage.getItem(`${el.name}`)) el.value = sessionStorage.getItem(`${el.name}`)
    });
    amountValueSenior.forEach((el) => {
        if (sessionStorage.getItem(`${el.name}`)) el.value = sessionStorage.getItem(`${el.name}`)
    });
    amountTotalValue.forEach((el) => {
        if (sessionStorage.getItem('totalPrice')) el.innerHTML = sessionStorage.getItem('totalPrice')
    });

    if (sessionStorage.getItem(`tickets-basic-value`)) overviewBasicTicketsQuantity.dataset.before = sessionStorage.getItem(`tickets-basic-value`);
    if (sessionStorage.getItem(`tickets-senior-value`))  overviewSeniorTicketsQuantity.dataset.before = sessionStorage.getItem(`tickets-senior-value`);

    if (sessionStorage.getItem('totalBasicPrice')) overviewBasicTicketsCost.textContent = sessionStorage.getItem('totalBasicPrice');
    if (sessionStorage.getItem('totalSeniorPrice')) overviewSeniorTicketsCost.textContent = sessionStorage.getItem('totalSeniorPrice');

    basicTicketCost.forEach((el) => {
        if (sessionStorage.getItem('costBasicTicket')) el.textContent = sessionStorage.getItem('costBasicTicket')
    });
    seniorTicketCost.forEach((el) => {
        if (sessionStorage.getItem('costSeniorTicket')) el.textContent = sessionStorage.getItem('costSeniorTicket')
    });

    const dateInput = document.querySelector('.form__input_date'),
      timeInput = document.querySelector('.form__input_time'),
      overviewDate= document.querySelector('.form__overview-date'),
      overviewTime= document.querySelector('.form__overview-time');

    if (sessionStorage.getItem('date')) {
        dateInput.value = sessionStorage.getItem('date');
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        overviewDate.textContent = new Intl.DateTimeFormat('en-US', options).format(new Date(sessionStorage.getItem('date')))
    }

    if (sessionStorage.getItem('time')) {
        timeInput.value = sessionStorage.getItem('time');
        overviewTime.textContent = sessionStorage.getItem('time').split(':').join(' : ')
    }
};

