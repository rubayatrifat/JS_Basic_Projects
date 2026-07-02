const toDoInput = document.querySelector("#todo-input")
const toDoAddBtn = document.querySelector("#add-btn")
const errMsg = document.querySelector("#error-msg")
const errClose = document.querySelector(".error-close-btn")
const toDoList = document.querySelector("#todo-list")
const filterBtn = document.querySelectorAll(".filter-btn")

// =========== Adding a todo ============

// Closing the err
function closeErr() {
    setTimeout(() => {
        errMsg.classList.remove("show")
    }, 5000)
    errClose.addEventListener("click", () => {
        errMsg.classList.remove("show")
    })
}

// Checking if the input is valid
function checkingInput() {
    if (toDoInput.value === "") {
        errMsg.classList.add("show")
        closeErr()
        return
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

    if (checkingInput()) {
        addToDo(checkingInput())
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


// function showAll(item) {
//     item.classList.remove("hide")
// }
// function showPending(item) {
//     if (item.classList.contains("completed")) {
//         item.classList.add("hide")
//     }
// }
// function showCompleted(item) {
//     if (item.classList.contains("pending")) {
//         item.classList.add("hide")
//     }
// }

// filterBtn.forEach(item => {
//     item.addEventListener("click", () => {
//         const currentActive = document.querySelector(".filter-btn.active")
//         if (currentActive) {
//             currentActive.classList.remove("active")
//         }
//         item.classList.add("active")

//         if (item.dataset.filter === "all") {
//             showAll()
//         } else if (item.dataset.filter === "pending") {
//             showPending()
//         } else if (item.dataset.filter === "completed") {
//             showCompleted()
//         }
//     })
// })