const images = [];
let imageCount = 0;

document.getElementById("loginBtn").addEventListener("click", showCamera);
document.getElementById("registerBtn").addEventListener("click", showCamera);

function showCamera() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    document.getElementById("loginBtn").disabled = true;
    document.getElementById("registerBtn").disabled = true;
    document.getElementById("camera").classList.remove("hidden");
    document.getElementById("captureBtn").disabled = false;

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const video = document.getElementById("video");
        video.srcObject = stream;
        video.play();
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
        document.getElementById("camera").classList.add("hidden");
        document.getElementById("loginBtn").disabled = false;
        document.getElementById("registerBtn").disabled = false;
      });
  } else {
    console.error("Camera not supported");
    document.getElementById("camera").classList.add("hidden");
    document.getElementById("loginBtn").disabled = false;
    document.getElementById("registerBtn").disabled = false;
  }
}

document.getElementById("captureBtn").addEventListener("click", captureImage);

function captureImage() {
  if (imageCount < 3) {
    const canvas = document.createElement("canvas");
    const video = document.getElementById("video");
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataURL = canvas.toDataURL("image/jpeg");
    images.push(imageDataURL);
    imageCount++;

    document.getElementById(
      "imageCount"
    ).textContent = `Images Captured: ${imageCount}/3`;

    if (imageCount === 3) {
      document.getElementById("captureBtn").disabled = true;
      document.getElementById("waitMessage").classList.remove("hidden");
      document.getElementById("loader").style.display = "block";

      // Simulating backend processing delay
      setTimeout(() => {
        document.getElementById("waitMessage").classList.add("hidden");
        document.getElementById("loader").style.display = "none";

        //  display the captured images
        const imageContainer = document.createElement("div");
        images.forEach((imageData) => {
          const img = document.createElement("img");
          img.src = imageData;
          img.classList.add("img-thumbnail", "m-2");
          imageContainer.appendChild(img);
        });
        document.getElementById("camera").appendChild(imageContainer);
      }, 2000);
    }
  }
}
