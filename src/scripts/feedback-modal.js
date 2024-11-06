emailjs.init({
  publicKey: "LPFUBE5fgZlLH_jFa",
});

const refs = {
  openModalBtns: document.querySelectorAll("[data-feedback-open]"),
  closeModalBtn: document.querySelector("[data-feedback-close]"),
  modal: document.querySelector("[data-feedback-modal]"),
};

refs.openModalBtns.forEach(btn => {
  btn.addEventListener("click", toggleModal);
})
refs.closeModalBtn.addEventListener("click", toggleModal);

function toggleModal() {
  refs.modal.classList.toggle("hidden");
}

function sendMail() {
  event.preventDefault();
  document.getElementById("feedback-form");

  const formData = {
    name: document.getElementById("feedback-name").value,
    email: document.getElementById("feedback-mail").value,
    message: document.getElementById("feedback-comment").value,
  };

  emailjs.send("service_djnyj9a", "template_li8ntcl", formData).then(
    function (response) {
      console.log("Feedback successfully send:", response);
      alert("Feedback successfully send!");
      refs.modal.classList.toggle("hidden");
    },
    function (error) {
      console.error("Feedback error send:", error);
      alert("Feedback error send!");
    }
  );
}
