const contianer = document.querySelector(".main__container"),
  slides = document.querySelectorAll(".slide"),
  inner = document.querySelector(".inner"),
  current = document.querySelector(".current"),
  total = document.querySelector(".total"),
  scrol = document.querySelector("#scroll"),
  next = document.querySelector(".next img"),
  height = window.getComputedStyle(inner).height,
  scrollHeight = window.getComputedStyle(scrol).height;

let sliderIndex = 1;
let offset = 0;
let scrollInner = 0;
console.log(scrollHeight);

if (slides.length < 10) {
  total.textContent = `0${slides.length}`;
  // current.textContent = `0${sliderIndex}`;
} else {
  total.textContent = slides.length;
  // current.textContent = sliderIndex;
}

inner.computedStyleMap.height = 100 * slides.length + "%";

slides.forEach((slide) => (slide.style.height = height));
const dots = [];

for (let i = 0; i < slides.length; i++) {
  const dot = document.createElement("div");
  dot.setAttribute("data-slide-to", i + 1);
  dot.classList.add("dot");
  if (i == 0) {
    dot.style.background = "#b4977b";
  }
  scrol.append(dot);
  if (
    scrollInner ==
    +scrollHeight.slice(0, scrollHeight.length - 2) * (dot.length - 1)
  ) {
    scrollInner = 0;
  } else {
    scrollInner += +scrollHeight.slice(0, scrollHeight.length - 2);
  }
  scrol.style.height = `${scrollInner}px`;
  dots.push(dot);
}

next.addEventListener("click", () => {
  if (offset == +height.slice(0, height.length - 2) * (slides.length - 1)) {
    offset = 0;
  } else {
    offset += +height.slice(0, height.length - 2);
  }
  inner.style.transform = `translateY(-${offset}px)`;

  if (sliderIndex === slides.length) {
    sliderIndex = 1;
  } else {
    sliderIndex++;
  }
  if (slides.length < 10) {
    current.textContent = `0${sliderIndex}`;
  } else if (sliderIndex < slides.length) {
    sliderIndex = slides.length;
  }
  dots.forEach((dot) => (dot.style.background = "transparent"));
  dots[sliderIndex - 1].style.background = "#b4977b";
});

dots.forEach((dot) =>
  dot.addEventListener("click", (e) => {
    const slideTo = e.target.getAttribute("data-slide-to");
    sliderIndex = slideTo;

    offset = +height.slice(0, height.length - 2) * (slideTo - 1);
    inner.style.transform = `translateY(-${offset}px)`;

    dots.forEach((dot) => (dot.style.background = "transparent"));
    dots[slideTo - 1].style.background = "#b4977b";

    if (slides.length < 10) {
      current.textContent = `0${slideTo}`;
    } else {
      slideTo == slides.length;
    }
    console.log(sliderIndex);
  })
);
