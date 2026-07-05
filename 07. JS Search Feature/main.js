const userData = {
    department: "Tech Team",
    users: [
        { id: 1, name: "Anik Rahman", role: "Frontend Developer" },
        { id: 2, name: "Sajid Hasan", role: "Backend Developer" },
        { id: 3, name: "Tamanna Islam", role: "UI/UX Designer" },
        { id: 4, name: "Naimur Rahman", role: "App Developer" },
        { id: 5, name: "Rokeya Sultana", role: "Data Scientist" }
    ]
}
const userList = document.querySelector("#userList")
const searchInput = document.querySelector("#searchInput")
let users = userData.users

function loadData() {
    for (let i = 0; i < users.length; i++) {
        let cardUi = `<li class="user-item">
                        <span class="user-name">${users[i].name}</span>
                        <span class="user-role">${users[i].role}</span>
                     </li>`

        userList.insertAdjacentHTML("afterbegin", cardUi)
    }
}

loadData()

function filterData() {
    users.filter((item) => {
        item
    })
}

searchInput.addEventListener("input", evt => {
    // if (evt.target.value ===)
    filterData()

})

