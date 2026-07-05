const toDoInput = document.querySelector("#todo-input")
const toDoAddBtn = document.querySelector("#add-btn")
const errMsg = document.querySelector("#error-msg")
const errClose = document.querySelector(".error-close-btn")
const toDoList = document.querySelector("#todo-list")
const filterBtn = document.querySelectorAll(".filter-btn")
if (localStorage.getItem("toDoInfo") === null) {
    localStorage.setItem("toDoInfo", JSON.stringify([]));
}
function loadData() {
    let itemCount = JSON.parse(localStorage.getItem("toDoInfo")).length
    let noItemMsg = document.createElement("span")
    if (itemCount === 0) {
        noItemMsg.style.color = "rgb(140 159 185)"
        noItemMsg.textContent = "No To-Do yet!!";

        toDoList.appendChild(noItemMsg);
    } else {
        toDoList.innerHTML = ""
        let toDoTxt = JSON.parse(localStorage.getItem("toDoInfo"))
        for (let i = 0; i < itemCount; i++) {
            let theItem = `
            <li class="todo-item" data-id="${toDoTxt[i].id}">
                <span class="task-text">${toDoTxt[i].text}</span>
                <button class="delete-btn">&times;</button>
            </li>`
            if (toDoTxt[i].isPending === false) {
                theItem = `
                <li class="todo-item completed" data-id="${toDoTxt[i].id}">
                    <span class="task-text">${toDoTxt[i].text}</span>
                    <button class="delete-btn">&times;</button>
                </li>`
            }
            toDoList.insertAdjacentHTML("afterbegin", theItem);
        }
    }
}

loadData()


// =========== Adding a todo ============

// Closing the err
function closeErr() {
    errMsg.classList.add("show")
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
// Adding Item to the local storage
function addItemLocalSto(title) {
    let theItem = {
        id: Date.now(),
        text: title,
        isPending: true
    }
    let currentList = JSON.parse(localStorage.getItem("toDoInfo"))
    currentList.push(theItem)
    localStorage.setItem("toDoInfo", JSON.stringify(currentList))
}

// Submiting todo
toDoAddBtn.addEventListener("click", (evt) => {
    evt.preventDefault()
    const inputValue = checkingInput()
    if (inputValue) {
        addItemLocalSto(inputValue)
        loadData()
        toDoInput.value = ""
    }
})



// ================ To-Do Items Functionalities ===============

function removeItem(id) {
    let localStoArr = JSON.parse(localStorage.getItem("toDoInfo"))
    let newData = localStoArr.filter(item => item.id !== Number(id))
    localStorage.setItem("toDoInfo", JSON.stringify(newData))
}

function completedItem(id) {
    let localStoArr = JSON.parse(localStorage.getItem("toDoInfo"))
    localStoArr.forEach(item => {
        if (item.id === Number(id)) {
            item.isPending = !item.isPending
        }
    })
    localStorage.setItem("toDoInfo", JSON.stringify(localStoArr))
}

toDoList.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("delete-btn")) {
        removeItem(evt.target.parentElement.dataset.id)
        evt.target.parentElement.remove()
        loadData()
    }

    if (evt.target.classList.contains("task-text")) {
        completedItem(evt.target.parentElement.dataset.id)
        evt.target.parentElement.classList.toggle("completed")
        loadData()
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
            if (currentFilter === "all") {
                singleItem.classList.remove("hide")
            } else if (currentFilter === "pending") {
                if (singleItem.classList.contains("completed")) {
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