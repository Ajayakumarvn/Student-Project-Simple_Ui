$(document).ready(function () {
  // Handle file input change
  $("#captcha-file").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $(".file-name").text(fileName);
    $(".captcha-image").show();
  });

  // Handle "Break CAPTCHA" button click
  $("#break-captcha-btn").on("click", function () {
    var file = $("#captcha-file")[0].files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var imageData = e.target.result;
        // Send imageData to backend for CAPTCHA breaking
        // Display the result returned from backend
        $(".captcha-result").text("CAPTCHA Result: ").show();
      };
      reader.readAsDataURL(file);
    }
  });
});
