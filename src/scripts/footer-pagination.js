const texts = [
  "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
];

function changeText(index) {
    const textElement = document.getElementById("footer-toggle-text");
  
    textElement.classList.add("fade-out");
  
    setTimeout(() => {
      textElement.innerText = texts[index];
      textElement.classList.remove("fade-out");
      textElement.classList.add("fade-in");
    }, 500);
  
    setTimeout(() => {
      textElement.classList.remove("fade-in");
    }, 1000);
  }