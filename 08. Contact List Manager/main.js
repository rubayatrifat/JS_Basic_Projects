// Accesing Modal open-close elements
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const formModal = document.getElementById('formModal');

// Accesing Form HTML 
const imgInput = document.querySelector(".image-url")
const userNameInput = document.querySelector(".user-name")
const userAddressInput = document.querySelector(".user-address")
const noteInput = document.querySelector("#noteInput")
const categoryInput = document.querySelectorAll(".category-rad")
const createNoteBtn = document.querySelector(".create-note")
const errMsg = document.querySelector("#errorMsg")
const imgUrlRegex = /\.(jpeg|jpg|gif|png|webp)$/i

// Show Modal
openModalBtn.addEventListener('click', () => {
    formModal.classList.remove('hidden');
    formModal.classList.add('flex');
});

// Hide Modal
closeModalBtn.addEventListener('click', () => {
    formModal.classList.add('hidden');
    formModal.classList.remove('flex');
});

// Close Modal if clicked outside the form box
window.addEventListener('click', (e) => {
    if (e.target === formModal) {
        formModal.classList.add('hidden');
        formModal.classList.remove('flex');
    }
});

// Err showing function
function showErr(messege) {
    errMsg.classList.remove("hidden")
    errMsg.textContent = messege
}

// Checking valid input (function)
function checkInputs() {
    if (imgInput.value.trim() === "" || !imgUrlRegex.test(imgInput.value)) {
        showErr("Please fill out the url field properly!!")
        return false
    } else if (userNameInput.value.trim() === "" || userAddressInput.value.trim() === "" || userNameInput.value.trim() === "" || noteInput.value.trim() === "") {
        showErr("Please fill out the input field!!")
    }
}
// Adding a new note card
createNoteBtn.addEventListener("click", evt => {
    checkInputs()
})

// category.forEach(item => {
//     if(item.checked === true) {
//         console.log(item.dataset.category)
//     }
// })