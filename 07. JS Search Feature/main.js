// Accesing Form HTML 
const imgInput = document.querySelector(".image-url")
const userName = document.querySelector(".user-name")
const userAddress = document.querySelector(".user-address")
const category = document.querySelectorAll(".category-rad")

// Accessing Card HTML




category.forEach(item => {
    if(item.checked === true) {
        console.log(item.dataset.category)
    }
})