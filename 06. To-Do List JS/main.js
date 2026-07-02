const toDoInput = document.querySelector("#todo-input")
const toDoAddBtn = document.querySelector("#add-btn")
const errMsg = document.querySelector("#error-msg")
const errClose = document.querySelector(".error-close-btn")
const toDoList = document.querySelector("#todo-list")
const filterBtn = document.querySelectorAll(".filter-btn")

// =========== Adding a todo ============

// Closing the err
function closeErr() {
    errMsg.classList.add("show")
    if (errTimer) clearTimeout(errTimer);
    let errTimer = setTimeout(() => {
        errMsg.classList.remove("show")
    }, 5000)
}

errClose.addEventListener("click", () => {
    errMsg.classList.remove("show")
})

// Checking if the input is valid
function checkingInput() {
    if (toDoInput.value.trim() === "") {
        closeErr()
        return null
    } else {
        errMsg.classList.remove("show")
        return toDoInput.value
    }
}

// Adding a todo to the list
function addToDo(toDoTxt) {
    let theItem = `           
    <li class="todo-item">
        <span class="task-text">${toDoTxt}</span>
        <button class="delete-btn">&times;</button>
    </li>`

    toDoList.insertAdjacentHTML("afterbegin", theItem)
}

// Submiting todo
toDoAddBtn.addEventListener("click", (evt) => {
    evt.preventDefault()
    const inputValue = checkingInput()
    if (inputValue) {
        addToDo(inputValue)
        toDoInput.value = ""
    }
})



// ================ To-Do Items Functionalities ===============
toDoList.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("delete-btn")) {
        evt.target.parentElement.remove()
    }

    if (evt.target.classList.contains("task-text")) {
        evt.target.parentElement.classList.toggle("completed")
    }
})

// ================ Adding Tabs funcitonalities ===============

filterBtn.forEach(item => {
    item.addEventListener("click", () => {
        const currentActive = document.querySelector(".filter-btn.active")
        if (currentActive) {
            currentActive.classList.remove("active")
        }
        item.classList.add("active")


        const currentFilter = item.dataset.filter

        const toDoItems = document.querySelectorAll(".todo-item")
        toDoItems.forEach(singleItem => {
            if(currentFilter === "all") {
                singleItem.classList.remove("hide")
            } else if (currentFilter === "pending") {
                if(singleItem.classList.contains("completed")) {
                    singleItem.classList.add("hide")
                } else {
                    singleItem.classList.remove("hide")
                }
            } else if (currentFilter === "completed") {
                if (!singleItem.classList.contains("completed")) {
                    singleItem.classList.add("hide")
                } else {
                    singleItem.classList.remove("hide")
                }
            }
        })
    })
})