// Home section animation
gsap.from("#home h1", { opacity: 0, y: -50, duration: 1 });
gsap.from("#home p", { opacity: 0, y: -50, duration: 1.2 });
gsap.from("#home .btn", { opacity: 0, y: 50, duration: 1.4 });

// About section animation
gsap.from("#about h2", { opacity: 0, y: -50, duration: 1 });
gsap.from("#about p", { opacity: 0, y: -50, duration: 1.2 });

// Portfolio section animation
gsap.from("#portfolio h2", { opacity: 0, y: -50, duration: 1 });
gsap.from("#portfolio .portfolio-item", { opacity: 0, y: 50, stagger: 0.3 });

// Contact section animation
gsap.from("#contact h2", { opacity: 0, y: -50, duration: 1 });
gsap.from("#contact input, #contact textarea, #contact button", { opacity: 0, y: 50, stagger: 0.3 });

// Navigation active link animation
const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {
  link.addEventListener("click", function() {
    navLinks.forEach(navLink => navLink.classList.remove("active"));
    this.classList.add("active");
  });
});

// Button hover animation
const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {
  button.addEventListener("mouseover", function() {
    gsap.to(this, { scale: 1.1, duration: 0.2 });
  });

  button.addEventListener("mouseout", function() {
    gsap.to(this, { scale: 1, duration: 0.2 });
  });
});