emailjs.init({
  publicKey: "LPFUBE5fgZlLH_jFa",
});

const refs = {
  openModalBtns: document.querySelectorAll("[data-feedback-open]"),
  closeModalBtn: document.querySelector("[data-feedback-close]"),
  modal: document.querySelector("[data-feedback-modal]"),
};

const formInputs = {
  name: document.getElementById("feedback-name"),
  email: document.getElementById("feedback-mail"),
  message: document.getElementById("feedback-comment"),
  status: document.getElementById("feedback-status"),
};

function clearFormInputs() {
  formInputs.name.value = "";
  formInputs.email.value = "";
  formInputs.message.value = "";
  formInputs.status.textContent = "";
}

function formOpenCloseListeners() {
  const toggleModal = () => {
    refs.modal.classList.toggle("hidden");
    clearFormInputs();
  };

  refs.openModalBtns.forEach((btn) => {
    btn.addEventListener("click", toggleModal);
  });
  refs.closeModalBtn.addEventListener("click", toggleModal);
}

function sendMail() {
  event.preventDefault();

  const formData = {
    name: formInputs.name.value,
    email: formInputs.email.value,
    message: formInputs.message.value,
  };

  emailjs.send("service_djnyj9a", "template_li8ntcl", formData).then(
    function (response) {
      console.log("Feedback successfully send:", response);
      if (formInputs.status.classList.contains("status-error")) {
        formInputs.status.classList.remove("status-error");
      }

      if (!formInputs.status.classList.contains("status-ok")) {
        formInputs.status.classList.add("status-ok");
      }

      clearFormInputs();
      formInputs.status.textContent = "Feedback successfully send!";
    },
    function (error) {
      console.error("Feedback error send:", error);
      if (formInputs.status.classList.contains("status-ok")) {
        formInputs.status.classList.remove("status-ok");
      }

      if (!formInputs.status.classList.contains("status-error")) {
        formInputs.status.classList.add("status-error");
      }

      formInputs.status.textContent = "Feedback error send!";
    }
  );
}

function formCustomValidation() {
  formInputs.name.addEventListener("invalid", function () {
    if (formInputs.name.value.length == 0) {
      formInputs.name.setCustomValidity("This field cannot be empty");
    } else {
      formInputs.name.setCustomValidity("");
    }
  });

  formInputs.email.addEventListener("invalid", function () {
    if (formInputs.email.value.length == 0) {
      formInputs.email.setCustomValidity("This field cannot be empty");
    } else if (
      !formInputs.email.validity.valid ||
      formInputs.email.validity.typeMismatch
    ) {
      formInputs.email.setCustomValidity("Invalid e-mail address");
    } else {
      formInputs.email.setCustomValidity("");
    }
  });

  formInputs.message.addEventListener("invalid", function () {
    if (formInputs.message.value.length == 0) {
      formInputs.message.setCustomValidity("This field cannot be empty");
    } else {
      formInputs.message.setCustomValidity("");
    }
  });

  formInputs.name.addEventListener("input", function () {
    formInputs.name.setCustomValidity("");
  });

  formInputs.email.addEventListener("input", function () {
    if (formInputs.email.validity.typeMismatch) {
      formInputs.email.setCustomValidity("Invalid e-mail address");
    } else {
      formInputs.email.setCustomValidity("");
    }
  });

  formInputs.message.addEventListener("input", function () {
    formInputs.message.setCustomValidity("");
  });
}

formOpenCloseListeners();
formCustomValidation();
