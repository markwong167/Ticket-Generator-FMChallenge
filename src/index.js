let ticketImage = undefined;
const ticketImageErrorMessage = "Error: you did not upload a valid image.";
const uploadImageErrorMessage = "File not accepted";
const somethingWrongErrorMessage = "Something wrong happened";
const imageWrongSizeErrorMessage =
  "Error: please upload an image smaller than 500KB";
const imageWrongTypeErrorMessage = "Error: please upload a JPG or PNG";
const emailWrongErrorMessage = "Please enter a valid email";
const acceptableImageTypes = ["image/jpeg", "image/jpg", "image/png"];
const validateEmail = (email) => {
  if (typeof email === "string") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email.toLowerCase());
  } else {
    return null;
  }
};

function handleUpload(event) {
  let imageFile = {};
  if (event.dataTransfer) {
    imageFile = event.dataTransfer?.files?.[0];
  } else if (event.target?.files?.[0]) {
    imageFile = event.target?.files?.[0];
  } else {
    console.error(uploadImageErrorMessage);
  }
  if (imageFile?.size > 500000) {
    document.getElementById("ticket-form-image-error").textContent =
      imageWrongSizeErrorMessage;
    return;
  } else if (!acceptableImageTypes.includes(imageFile?.type)) {
    document.getElementById("ticket-form-image-error").textContent =
      imageWrongTypeErrorMessage;
    return;
  }
  const uploadedImage = document.getElementById("uploaded-image");
  const imageDropzone = document.getElementById("image-dropzone");
  imageDropzone.style.display = "none";
  uploadedImage.style.display = "block";
  uploadedImage.src = URL.createObjectURL(imageFile);
  ticketImage = imageFile;
  document.getElementById("ticket-form-image-error").textContent = "";
  event.preventDefault();
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  if (ticketImage === undefined) {
    console.error(ticketImageErrorMessage);
    document.getElementById("ticket-form-image-error").textContent =
      ticketImageErrorMessage;
  } else if (validateEmail(formData.get("email")) === null) {
    const emailError = document.getElementById("ticket-form-email-error");
    emailError.style.display = "block";
    emailError.textContent = somethingWrongErrorMessage;
  } else if (validateEmail(formData.get("email")) === false) {
    const emailError = document.getElementById("ticket-form-email-error");
    emailError.style.display = "block";
    emailError.textContent = emailWrongErrorMessage;
  } else {
    //Hide form, show ticket
    const formDiv = document.getElementById("form-div");
    const viewDiv = document.getElementById("view-div");
    formDiv.style.display = "none";
    viewDiv.style.display = "flex";

    //set and store items
    sessionStorage.setItem("fullName", formData.get("name"));
    sessionStorage.setItem("email", formData.get("email"));
    sessionStorage.setItem("githubUsername", formData.get("githubUsername"));
    const params = new URLSearchParams({
      name: formData.get("name"),
      email: formData.get("email"),
      githubUsername: formData.get("githubUsername"),
    });
    const urlParams = new URLSearchParams(params);
    const newId = "#" + Math.floor(Math.random() * 100000);
    const imageUrl = URL.createObjectURL(ticketImage);

    // show new items on html
    document.getElementById("name-display").textContent = `${urlParams.get(
      "name"
    )}`;
    document.getElementById(
      "name-display-ticket"
    ).textContent = `${urlParams.get("name")}`;
    document.getElementById("email-display").textContent = `${urlParams.get(
      "email"
    )}`;
    document.getElementById("ticket-image-display").src = imageUrl;
    document.getElementById("id-number").textContent = newId;
    document.getElementById(
      "github-username-display"
    ).textContent = `@${urlParams.get("githubUsername")}`;
  }
}
