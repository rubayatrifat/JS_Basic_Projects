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

// Card Delete and Edit 
const cardDeleteBtn = document.querySelector("#deleteCardBtn")
const cardEditBtn = document.querySelector("#editCardBtn")
const cardDeleteCnfrm = document.querySelector("#deleteConfirmModal")
const cardEditModal = document.querySelector("#editFormModal")

// Card Edit inputs
const imgEditInput = document.querySelector("#editImgInput")
const nameEditInput = document.querySelector("#editNameInput")
const addressEditInput = document.querySelector("#editAddressInput")
const noteEditInput = document.querySelector("#editNoteInput")
const editCategories = document.querySelectorAll(".edit-category-rad")
const editErrMsg = document.querySelector("#editErrorMsg")

// Card Navigation Buttons
const nextCardBtn = document.querySelector(".next-card")
const prevCardBtn = document.querySelector(".prev-card")

// Category Buttons
const categoryFilterBtns = document.querySelectorAll(".category-btn")

// Initialing Local Data Sotorage
if (!localStorage.getItem("contactList")) {
    localStorage.setItem("contactList", "[]")
}

// Acitve Category
let activeCategory

// Current item index
let currentCardIndex

// Filtered Contact list 
let contactListFiltered = []

// Loading Data to UI
function loadDataUI(itemNumber) {
    // Checking active category
    activeCategory = document.querySelector(".active-filter").dataset.filter

    let contactList = JSON.parse(localStorage.getItem("contactList"))

    if (activeCategory === "all") {
        if (contactList.length > 0) {
            let contactListItem = contactList[itemNumber]
            userImageUI.src = contactListItem.imgUrl
            userNameUI.textContent = contactListItem.name
            addressUI.textContent = contactListItem.address
            noteUI.textContent = contactListItem.note
            UiCard.classList.remove("urgent-card", "important-card", "norush-card")
            UiCard.classList.add(`${contactListItem.category}-card`)
            currentCardIndex = itemNumber
            cardEditBtn.disabled = false
            cardDeleteBtn.disabled = false
        } else {
            userImageUI.src = "https://zafarplastic.com/wp-content/uploads/2024/02/zpceo.jpg"
            userNameUI.textContent = "No Data"
            addressUI.textContent = "No Data"
            noteUI.textContent = "No Data"
            UiCard.classList.remove("urgent-card", "important-card", "norush-card")
            cardEditBtn.disabled = true
            cardDeleteBtn.disabled = true
        }
    } else {
        if (contactListFiltered.length > 0) {
            if (itemNumber >= contactListFiltered.length) {
                itemNumber = contactListFiltered.length - 1;
            }
            if (itemNumber < 0) itemNumber = 0;

            let filteredItem = contactListFiltered[itemNumber];

            if (filteredItem) {
                userImageUI.src = filteredItem.imgUrl;
                userNameUI.textContent = filteredItem.name;
                addressUI.textContent = filteredItem.address;
                noteUI.textContent = filteredItem.note;
                UiCard.classList.remove("urgent-card", "important-card", "norush-card");
                UiCard.classList.add(`${filteredItem.category}-card`);
                currentCardIndex = itemNumber;
                cardEditBtn.disabled = false;
                cardDeleteBtn.disabled = false;
            }
        } else {
            userImageUI.src = "https://zafarplastic.com/wp-content/uploads/2024/02/zpceo.jpg";
            userNameUI.textContent = "No Data";
            addressUI.textContent = "No Data";
            noteUI.textContent = "No Data";
            UiCard.classList.remove("urgent-card", "important-card", "norush-card");
            cardEditBtn.disabled = true;
            cardDeleteBtn.disabled = true;
        }
    }
}
loadDataUI(0)

// Removing data from UI
function removeDataUi(itemIndex) {
    activeCategory = document.querySelector(".active-filter").dataset.filter;

    let contactList = JSON.parse(localStorage.getItem("contactList"));

    if (activeCategory === "all") {
        contactList.splice(itemIndex, 1);

        localStorage.setItem("contactList", JSON.stringify(contactList));
    } else {
        let targetItem = contactListFiltered[itemIndex];

        contactListFiltered.splice(itemIndex, 1);

        let mainIndex = contactList.findIndex(item =>
            item.name === targetItem.name &&
            item.imgUrl === targetItem.imgUrl &&
            item.note === targetItem.note
        );

        if (mainIndex !== -1) {
            contactList.splice(mainIndex, 1);
        }

        localStorage.setItem("contactList", JSON.stringify(contactList));
    }
}

// Checking Button Disability
function checkBtnDisbl() {
    activeCategory = document.querySelector(".active-filter").dataset.filter
    if (activeCategory === "all") {
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
        } else {
            prevCardBtn.disabled = true
            nextCardBtn.disabled = true
        }
    } else {
        if (contactListFiltered.length > 1) {
            if (currentCardIndex === 0) {
                prevCardBtn.disabled = true
                nextCardBtn.disabled = false
            } else if (currentCardIndex === contactListFiltered.length - 1) {
                nextCardBtn.disabled = true
                prevCardBtn.disabled = false
            } else {
                prevCardBtn.disabled = false
                nextCardBtn.disabled = false
            }
        } else {
            prevCardBtn.disabled = true
            nextCardBtn.disabled = true
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
    if (e.target === cardEditModal) {
        cardEditModal.classList.add('hidden');
        cardEditModal.classList.remove('flex');
    }
    if (e.target === cardDeleteCnfrm) {
        cardDeleteCnfrm.classList.add('hidden');
        cardDeleteCnfrm.classList.remove('flex');
    }
});

// Err showing function
function showErr(messege, errContainer) {
    errContainer.classList.remove("hidden")
    errContainer.textContent = messege
    setTimeout(() => {
        errContainer.classList.add("hidden")
    }, 3000)
}

// Live changing charecter count
function liveCharCount(inputsModal) {
    inputsModal.addEventListener("input", evt => {
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
}

liveCharCount(formModal)
liveCharCount(cardEditModal)

// Limited Charecter validation
function checkCharNum(targetEle, maxChar, name, errContainer) {
    if (targetEle.value.length > maxChar) {
        showErr(`You can only input ${maxChar} charecter in ${name}!!`, errContainer)
        return false
    }
    return true
}

// Checking valid input (function)
function checkInputs(imgUrlInput, nameInput, addressInput, noteInput, categoryArr, errMsgContainer) {
    if (imgUrlInput.value.trim() === "" || !imgUrlRegex.test(imgUrlInput.value)) {
        showErr("Please fill out the url field properly!!", errMsgContainer)
        return false
    } else if (nameInput.value.trim() === "" || addressInput.value.trim() === "" || noteInput.value.trim() === "") {
        showErr("Please fill out the input field!!", errMsgContainer)
        return false
    }
    let categoryChecked = Array.from(categoryArr).some(item => item.checked)
    if (!categoryChecked) {
        showErr("Please select a category!!", errMsgContainer)
        return false
    }
    return checkCharNum(nameInput, nameInput.dataset.maxchar, "Name Input Field", errMsgContainer)
        && checkCharNum(addressInput, addressInput.dataset.maxchar, "Address Input Field", errMsgContainer)
        && checkCharNum(noteInput, noteInput.dataset.maxchar, "Note Input Field", errMsgContainer)
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
    if (checkInputs(imgInput, userNameInput, userAddressInput, noteInput, categoryInputs, errMsg) === false) return;
    saveData()
    resetForm()
    categoryFilterBtns.forEach(btn => {
        btn.classList.remove("border-2", "border-[#121212]", "outline", "outline-1", "outline-[#ffffff73]", "scale-110", "active-filter");
        btn.classList.add("border-transparent", "outline-transparent");
    });

    const allFilterBtn = document.querySelector('[data-filter="all"]');
    if (allFilterBtn) {
        allFilterBtn.classList.remove("border-transparent", "outline-transparent");
        allFilterBtn.classList.add("border-2", "border-[#121212]", "outline", "outline-1", "outline-[#ffffff73]", "scale-110", "active-filter");
    }
    loadDataUI(JSON.parse(localStorage.getItem("contactList")).length - 1);
    checkBtnDisbl();
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


// Filtering Items
function filterItems(filterCate) {
    let latestItems = JSON.parse(localStorage.getItem("contactList"))
    contactListFiltered = latestItems.filter(item => {
        return item.category === filterCate
    })
}

// Categorywise Navigaiton
categoryFilterBtns.forEach(item => {
    item.addEventListener("click", evt => {
        categoryFilterBtns.forEach(btn => {
            btn.classList.remove("border-2", "border-[#121212]", "outline", "outline-1", "outline-[#ffffff73]", "scale-110");
            btn.classList.add("border-transparent", "outline-transparent");
            btn.classList.remove("active-filter")
        });

        item.classList.remove("border-transparent", "outline-transparent");
        item.classList.add("border-2", "border-[#121212]", "outline", "outline-1", "outline-[#ffffff73]", "scale-110");
        item.classList.add("active-filter")

        // Filtering Items
        filterItems(item.dataset.filter)

        // Loading Filtered UI
        loadDataUI(0)

        // Checking Button disablity
        checkBtnDisbl()
    });


});

// Delete Button Functionality
cardDeleteBtn.addEventListener("click", evt => {
    // Showing confirmation modal
    cardDeleteCnfrm.classList.remove("hidden")
    cardDeleteCnfrm.classList.add("flex")
})

cardDeleteCnfrm.addEventListener("click", evt => {
    // Cancelling or confirming the process
    if (evt.target.id === "confirmDeleteBtn") {
        cardDeleteCnfrm.classList.remove("flex")
        cardDeleteCnfrm.classList.add("hidden")
        removeDataUi(currentCardIndex)
        loadDataUI(0)
        checkBtnDisbl()
    } else if (evt.target.id === "cancelDeleteBtn") {
        cardDeleteCnfrm.classList.remove("flex")
        cardDeleteCnfrm.classList.add("hidden")
    }
})

// Updating counters
function updateCounterUI(inputElement) {
    if (!inputElement) return;

    let charCountElm = document.getElementById(inputElement.id.replace("Input", "Counter"));
    if (!charCountElm) return;

    let currentLen = inputElement.value.length;
    charCountElm.textContent = currentLen;

    if (currentLen > parseInt(inputElement.dataset.maxchar)) {
        charCountElm.style.color = "rgb(239 68 68)";
    } else {
        charCountElm.style.color = "rgb(107 114 128)";
    }
}

// Loading Data to edit inputs
function loadDataToEditInputs(itemIndex) {
    activeCategory = document.querySelector(".active-filter").dataset.filter;

    let contactList = JSON.parse(localStorage.getItem("contactList"));

    if (activeCategory === "all") {
        let contactListItem = contactList[itemIndex]
        imgEditInput.value = contactListItem.imgUrl
        nameEditInput.value = contactListItem.name
        addressEditInput.value = contactListItem.address
        noteEditInput.value = contactListItem.note
        document.querySelector(`[data-editcategory="${contactListItem.category}"]`).checked = true
        updateCounterUI(imgEditInput)
        updateCounterUI(nameEditInput)
        updateCounterUI(addressEditInput)
        updateCounterUI(noteEditInput)
    } else {
        let contactListItem = contactListFiltered[itemIndex]
        imgEditInput.value = contactListItem.imgUrl
        nameEditInput.value = contactListItem.name
        addressEditInput.value = contactListItem.address
        noteEditInput.value = contactListItem.note
        document.querySelector(`[data-editcategory="${contactListItem.category}"]`).checked = true
        updateCounterUI(imgEditInput)
        updateCounterUI(nameEditInput)
        updateCounterUI(addressEditInput)
        updateCounterUI(noteEditInput)
    }
}

// Updating Edited data
function updateData() {
    let latestData = JSON.parse(localStorage.getItem("contactList")) || [];
    activeCategory = document.querySelector(".active-filter").dataset.filter;

    if (activeCategory === "all") {
        let selectedItem = latestData[currentCardIndex];
        selectedItem.imgUrl = imgEditInput.value;
        selectedItem.name = nameEditInput.value;
        selectedItem.address = addressEditInput.value;
        selectedItem.note = noteEditInput.value;

        const checkedRadio = document.querySelector(".edit-category-rad:checked");

        
        if (checkedRadio) {
            selectedItem.category = checkedRadio.dataset.editcategory;
            UiCard.classList.remove("urgent-card", "important-card", "norush-card")
            UiCard.classList.add(`${checkedRadio.dataset.editcategory}-card`)
        }

        localStorage.setItem("contactList", JSON.stringify(latestData));
        loadDataUI(currentCardIndex);

    } else {
        let filteredItem = contactListFiltered[currentCardIndex];

        let mainIndex = latestData.findIndex(item =>
            item.name === filteredItem.name &&
            item.imgUrl === filteredItem.imgUrl &&
            item.note === filteredItem.note
        );

        if (mainIndex !== -1) {
            let selectedItem = latestData[mainIndex];

            selectedItem.imgUrl = imgEditInput.value;
            selectedItem.name = nameEditInput.value;
            selectedItem.address = addressEditInput.value;
            selectedItem.note = noteEditInput.value;

            editCategories.forEach(item => {
                if (item.checked === true) {
                    selectedItem.category = item.dataset.editcategory;
                }
            });

            localStorage.setItem("contactList", JSON.stringify(latestData));

            filterItems(activeCategory);
        }

        loadDataUI(currentCardIndex);

        checkBtnDisbl();
    }
}

// Edit Button Functionality
cardEditBtn.addEventListener("click", evt => {
    cardEditModal.classList.add("flex") 
    cardEditModal.classList.remove("hidden") 
    loadDataToEditInputs(currentCardIndex)
})

cardEditModal.addEventListener("click", evt => {
    if (evt.target.id === "closeEditModalBtn") {
        cardEditModal.classList.remove("flex")
        cardEditModal.classList.add("hidden")
    }
    if (evt.target.id === "saveEditBtn") {
        if (checkInputs(imgEditInput, nameEditInput, addressEditInput, noteEditInput, editCategories, editErrMsg) === false) return;
        updateData()
        cardEditModal.classList.remove("flex")
        cardEditModal.classList.add("hidden")
    }
})