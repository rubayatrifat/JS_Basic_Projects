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

function loadData(dataArr) {
    userList.innerHTML = ""
    dataArr.forEach(item => {
        let cardUi = `<li class="user-item">
                        <span class="user-name">${item.name}</span>
                        <span class="user-role">${item.role}</span>
                     </li>`

        userList.insertAdjacentHTML("beforeend", cardUi)
    }) 
}

loadData(users)

function filterData(inputedValue) {
    let searchedItms = users.filter(item => {
        return item.name.toLowerCase().includes(inputedValue.toLowerCase()) || item.role.toLowerCase().includes(inputedValue.toLowerCase())
    })

    loadData(searchedItms)
}

searchInput.addEventListener("input", evt => {
    filterData(evt.target.value)

})

