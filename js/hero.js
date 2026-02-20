const hero = document.getElementById("hero");
const title = document.getElementById("hero-title");
const text = document.getElementById("hero-text");
const btn = document.getElementById("hero-btn");

const slides = [
  {
    image: "assets/car1.jpg",
    title: "Sports Car 2026",
    text: "An exhilarating driving experience",
    btn: "Discover Now",
    btnLink: "products.html",
  },
  {
    image: "assets/car2.jpg",
    title: "New SUV",
    text: "Comfort and power on the road",
    btn: "Browse Cars",
    btnLink: "products.html",
  },
  {
    image: "assets/car1.jpg",
    title: "Modern Electric Car",
    text: "Innovation and high efficiency",
    btn: "Discover Now",
    btnLink: "products.html",
  },
];
let index = 0;

function animateContent() {
  title.classList.remove("animate-title");
  text.classList.remove("animate-text");
  btn.classList.remove("animate-btn");

  void title.offsetWidth; // reset animation

  title.classList.add("animate-title");
  text.classList.add("animate-text");
  btn.classList.add("animate-btn");
}

function showSlide(i) {
  hero.style.backgroundImage = `url(${slides[i].image})`;

  title.textContent = slides[i].title;
  text.textContent = slides[i].text;
  btn.textContent = slides[i].btn;
  btn.href = slides[i].btnLink;

  animateContent();
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

document.getElementById("nextSlide").onclick = nextSlide;
document.getElementById("prevSlide").onclick = prevSlide;

showSlide(index);
setInterval(nextSlide, 5000);


const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
