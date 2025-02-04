let ticketImage = {};

function handleUpload(event) {
  let imageFile = {};
  if (event.dataTransfer) {
    imageFile = event.dataTransfer?.files?.[0];
  } else if (event.target?.files?.[0]) {
    imageFile = event.target?.files?.[0];
  } else {
    console.error("file not accepted");
  }
  console.log(imageFile);
  const uploadedImage = document.getElementById("uploaded-image");
  const imageDropzone = document.getElementById("image-dropzone");
  imageDropzone.style.display = "none";
  uploadedImage.style.display = "block";
  uploadedImage.src = URL.createObjectURL(imageFile);
  ticketImage = imageFile;
  event.preventDefault();
}
function handleDragOver(event) {
  event.preventDefault();
}

function handleSubmit(event) {
  event.preventDefault();
  const formDiv = document.getElementById("form-div");
  const viewDiv = document.getElementById("view-div");
  formDiv.style.display = "none";
  viewDiv.style.display = "flex";
  const form = event.target;
  const formData = new FormData(form);
  const name = formData.get("name");
  const email = formData.get("email");
  const githubUsername = formData.get("githubUsername");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Github Username:", githubUsername);
  sessionStorage.setItem("fullName", formData.get("name"));
  sessionStorage.setItem("email", formData.get("email"));
  sessionStorage.setItem("githubUsername", formData.get("githubUsername"));
  const params = new URLSearchParams({
    name: formData.get("name"),
    email: formData.get("email"),
    githubUsername: formData.get("githubUsername"),
  });
  const urlParams = new URLSearchParams(params);
  document.getElementById("nameDisplay").textContent = `${urlParams.get(
    "name"
  )}`;
  document.getElementById("nameDisplayTicket").textContent = `${urlParams.get(
    "name"
  )}`;
  document.getElementById("emailDisplay").textContent = `${urlParams.get(
    "email"
  )}`;
  const imageUrl = URL.createObjectURL(ticketImage);
  document.getElementById("ticketImageDisplay").src = imageUrl;
  document.getElementById(
    "githubUsernameDisplay"
  ).textContent = `${urlParams.get("githubUsername")}`;
}
