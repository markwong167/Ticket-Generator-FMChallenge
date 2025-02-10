let ticketImage = undefined;

function handleUpload(event) {
  let imageFile = {};
  if (event.dataTransfer) {
    imageFile = event.dataTransfer?.files?.[0];
  } else if (event.target?.files?.[0]) {
    imageFile = event.target?.files?.[0];
  } else {
    console.error("file not accepted");
  }
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
  const form = event.target;
  const formData = new FormData(form);

  if (ticketImage === undefined) {
    document.getElementById("ticket-form-image-error").src = imageUrl;
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
