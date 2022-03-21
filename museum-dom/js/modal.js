const buttonModal = document.getElementById("buyTickets");
const modalForm = document.body.querySelector(".modal");
const closeModal = document.querySelector(".modal__close");


buttonModal.addEventListener("click", function() {
    modalForm.classList.toggle("show");
});

closeModal.addEventListener("click", function() {
    modalForm.classList.remove("show");
});
