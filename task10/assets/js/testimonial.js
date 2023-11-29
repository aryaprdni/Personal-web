// OOP
// class Testimonial {
//   constructor(name, review, image) {
//     this.name = name;
//     this.review = review;
//     this.image = image;
//   }

//   html() {
//     return `
//             <div class="testimonial">
//                 <img src="${this.image}" class="profile-testimonial" />
//                 <p class="quote">"${this.review}"</p>
//                 <p class="author">- ${this.name}</p>
//             </div>
//         `;
//   }
// }

// const testimonial1 = new Testimonial("Bayu", "Saya bangga dengan Chelsea", "https://images.pexels.com/photos/3754285/pexels-photo-3754285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
// const testimonial2 = new Testimonial("Hima", "Saya bangga dengan City", "https://images.pexels.com/photos/3468827/pexels-photo-3468827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
// const testimonial3 = new Testimonial("Tayo", "Saya malu dengan MU", "https://images.pexels.com/photos/936019/pexels-photo-936019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");

// const testimonials = [testimonial1, testimonial2, testimonial3];

// let testimonialHTML = ``;
// for (let index = 0; index < testimonials.length; index++) {
//   testimonialHTML += testimonials[index].html();
// }

// document.getElementById("testimonials").innerHTML = testimonialHTML;

// HOF
const testimonialData = [
  {
      author: "Oyonk",
      content: "Keren banget jasanya! Top notch!",
      image: "https://images.unsplash.com/photo-1563351672-62b74891a28a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRoZSUyMGd1eXxlbnwwfHwwfHx8MA%3D%3D",
      rating: 1,
  },
  {
      author: "Juki",
      content: "Keren banget!",
      image: "https://images.unsplash.com/flagged/photo-1595514191830-3e96a518989b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRoZSUyMGd1eXxlbnwwfHwwfHx8MA%3D%3D",
      rating: 2
  },
  {
      author: "Bombom",
      content: "Apasih bang!",
      image: "https://images.unsplash.com/photo-1463860452799-793003efcb2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRoZSUyMGd1eXxlbnwwfHwwfHx8MA%3D%3D",
      rating: 3
  },
  {
      author: "Alunk",
      content: "Oke deh!",
      image: "https://images.unsplash.com/photo-1543060829-a0029874b174?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRoZSUyMGd1eXxlbnwwfHwwfHx8MA%3D%3D",
      rating: 4
  },
  {
      author: "Ucup",
      content: "Oke deh!",
      image: "https://images.unsplash.com/photo-1578100044626-110806c15b00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRoZSUyMGd1eXxlbnwwfHwwfHx8MA%3D%3D",
      rating: 5
  },
  {
      author: "cloky",
      content: "Oke deh!",
      image: "https://media.istockphoto.com/id/1466218539/photo/image-of-young-asian-man-holding-microphone-on-background.webp?b=1&s=170667a&w=0&k=20&c=TFuuAwRshTF3tphPZuKOgWW_dZOGdkoytZe90LXwlZo=",
      rating: 5
  }
]

function html(item) {
  return `
  <div class="card" style="width: 18rem;">
    <img src="${item.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <p class="card-text content text-start">${item.content}</p>
      <p class="card-text author text-end">${item.author}</p>
      <p class="card-text text-end">${item.rating} <i class="fa-solid fa-star"></i></p>
    </div>
  </div>
  `
}

function allTestimonials() {
  let testimonialHTML = ``
  testimonialData.forEach((item) => {
      testimonialHTML += html(item)
  })

  document.getElementById("testimonials").innerHTML = testimonialHTML
}

allTestimonials()

function filterTestimonials(rating) {
  let testimonialHTML = ``
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