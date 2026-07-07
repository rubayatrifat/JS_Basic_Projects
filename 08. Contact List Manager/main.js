// Accesing Modal open-close elements
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const formModal = document.getElementById('formModal');

// Accesing Form HTML 
const imgInput = document.querySelector(".image-url")
const userNameInput = document.querySelector(".user-name")
const userAddressInput = document.querySelector(".user-address")
const noteInput = document.querySelector("#noteInput")
const categoryInputs = document.querySelectorAll(".category-rad")
const createNoteBtn = document.querySelector(".create-note")
const errMsg = document.querySelector("#errorMsg")
const imgUrlRegex = /^(https?:\/\/)[^\s$.?#].[^\s]*$/i;

// Accesing Card UI components
const UiCard = document.querySelector(".single-card")
const userImageUI = document.querySelector(".user-image-ui")
const userNameUI = document.querySelector(".user-name-ui")
const addressUI = document.querySelector(".home-town")
const noteUI = document.querySelector(".note-ui")

// Card Navigation Buttons
const nextCardBtn = document.querySelector(".next-card")
const prevCardBtn = document.querySelector(".prev-card")

// Current item index
let currentCardIndex

// Initialing Local Data Sotorage
if (!localStorage.getItem("contactList")) {
    localStorage.setItem("contactList", "[]")
}

// Loading Data to UI
function loadDataUI(itemNumber) {
    let contactList = JSON.parse(localStorage.getItem("contactList"))

    if (contactList.length > 0) {
        let theItem = contactList[itemNumber]
        userImageUI.src = theItem.imgUrl
        userNameUI.textContent = theItem.name
        addressUI.textContent = theItem.address
        noteUI.textContent = theItem.note
        UiCard.classList.remove("urgent-card", "Family-card", "important-card", "norush-card")
        UiCard.classList.add(`${theItem.category}-card`)
        currentCardIndex = itemNumber
    }
}
loadDataUI(0)

// Checking Button Disability
function checkBtnDisbl() {
    if (JSON.parse(localStorage.getItem("contactList")).length > 1) {
        if (currentCardIndex === 0) {
            prevCardBtn.disabled = true
            nextCardBtn.disabled = false
        } else if (currentCardIndex === JSON.parse(localStorage.getItem("contactList")).length - 1) {
            nextCardBtn.disabled = true
            prevCardBtn.disabled = false
        } else {
            prevCardBtn.disabled = false
            nextCardBtn.disabled = false
        }
    }
}

checkBtnDisbl()


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
    setTimeout(() => {
        errMsg.classList.add("hidden")
    }, 3000)
}

// Live changing charecter count
formModal.addEventListener("input", evt => {
    let inputedCharLen = evt.target.value.length
    let charCountElm = document.getElementById(evt.target.id.replace("Input", "Counter"))
    if (!charCountElm) return
    charCountElm.textContent = inputedCharLen
    if (inputedCharLen > evt.target.dataset.maxchar) {
        charCountElm.style.color = "rgb(239 68 68)"
    } else {
        charCountElm.style.color = "rgb(107 114 128)"
    }
})

// Limited Charecter validation
function checkCharNum(targetEle, maxChar, name) {
    if (targetEle.value.length > maxChar) {
        showErr(`You can only input ${maxChar} charecter in ${name}!!`)
        return false
    }
    return true
}

// Checking valid input (function)
function checkInputs() {
    if (imgInput.value.trim() === "" || !imgUrlRegex.test(imgInput.value)) {
        showErr("Please fill out the url field properly!!")
        return false
    } else if (userNameInput.value.trim() === "" || userAddressInput.value.trim() === "" || noteInput.value.trim() === "") {
        showErr("Please fill out the input field!!")
        return false
    }
    let categoryChecked = Array.from(categoryInputs).some(item => item.checked)
    if (!categoryChecked) {
        showErr("Please select a category!!")
        return false
    }
    return checkCharNum(userNameInput, userNameInput.dataset.maxchar, "Name Input Field")
        && checkCharNum(userAddressInput, userAddressInput.dataset.maxchar, "Address Input Field")
        && checkCharNum(noteInput, noteInput.dataset.maxchar, "Note Input Field")
}

// Saving Data to local storage
function saveData() {
    // Creating a object with all info
    let contactCategory
    categoryInputs.forEach(item => {
        if (item.checked === true) {
            contactCategory = item.dataset.category
        }
    })
    let contactDataObj = {
        imgUrl: imgInput.value,
        name: userNameInput.value,
        address: userAddressInput.value,
        note: noteInput.value,
        category: contactCategory
    }

    // Adding the object to the local storage
    let localStorageArr = JSON.parse(localStorage.getItem("contactList"))
    localStorageArr.push(contactDataObj)
    localStorage.setItem("contactList", JSON.stringify(localStorageArr))

}

// Reseting the form
function resetForm() {
    // Reseting input
    imgInput.value = ""
    userNameInput.value = ""
    userAddressInput.value = ""
    noteInput.value = ""
    // Reseting input charecter counter
    nameCounter.textContent = "0"
    homeCounter.textContent = "0"
    noteCounter.textContent = "0"
    // Reseting input counter color
    nameCounter.style.color = "rgb(107 114 128)"
    homeCounter.style.color = "rgb(107 114 128)"
    noteCounter.style.color = "rgb(107 114 128)"
    // Closing the modal
    formModal.classList.add('hidden');
    formModal.classList.remove('flex');
}

// Adding a new note card
createNoteBtn.addEventListener("click", evt => {
    if (checkInputs() === false) return;
    saveData()
    resetForm()
    loadDataUI(JSON.parse(localStorage.getItem("contactList")).length - 1)
    checkBtnDisbl()
})

// Card Navigation
nextCardBtn.addEventListener("click", evt => {
    // Loading next card data
    loadDataUI(++currentCardIndex)

    // Checking button disability
    checkBtnDisbl()
})

prevCardBtn.addEventListener("click", evt => {
    // Loading next card data
    loadDataUI(--currentCardIndex)

    // Checking button disability
    checkBtnDisbl()
})