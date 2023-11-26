// penggabungan promise dan juga ajax
const janji = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://api.npoint.io/8e5cfd1db622a1674cbb', true)
    xhr.onload = () => {
        if (xhr.status === 200) {
            
            // console.log("berhasil", xhr.response)
            resolve(JSON.parse(xhr.response))
        } else {
            reject("Internal server error!")
            // console.log("gagal", xhr.response)
        }
    }

    xhr.onerror = () => { // kesalahan kita sendiri / client
        reject("Network error!")
        // console.log("Network error! Please check your internet connection")
    }
    xhr.send()
})

function html(item) {
    return `<div class="card" style="width: 18rem; ">
    <img src="${item.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <p class="card-text content text-start">${item.content}</p>
      <p class="card-text author text-end">${item.author}</p>
      <p class="card-text text-end">${item.rating} <i class="fa-solid fa-star"></i></p>
    </div>
  </div>`
}

async function allTestimonials() {
    let testimonialHTML = ``
    const testimonialData = await janji

    testimonialData.forEach((item) => {
        testimonialHTML += html(item)
    })

    document.getElementById("testimonials").innerHTML = testimonialHTML
}

allTestimonials()

async function filterTestimonials(rating) {
    let testimonialHTML = ``
    const testimonialData = await janji
    // const response = await fetch('https://api.npoint.io/8cb224c89fa998fae96a', {
    //     method: "GET"
    // })

    // const testimonialData = await response.json()

    const testimonialFiltered = testimonialData.filter((item) => {
        return item.rating === rating
    })

    if (testimonialFiltered.length === 0) {
        testimonialHTML = `<h3> Data not found! </h3>`
    } else {
        testimonialFiltered.forEach((item) => {
            testimonialHTML += html(item)
        })
    }

    document.getElementById("testimonials").innerHTML = testimonialHTML
}