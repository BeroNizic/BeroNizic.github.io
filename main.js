$(document).ready(function () {
  $("#btnCloseAlert").click(function () {
    $(this).parent().hide();
  });
});

window.addEventListener("DOMContentLoaded", (evt) => {
  const dt = new Date();
  const date = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
  const hour = dt.getHours();
  const minutes = dt.getMinutes();
  const time = (hour < 10 ? "0" : "") + hour + ":" + (minutes < 10 ? "0" : "") + minutes;
  const dateTime = date + "T" + time;
  document.getElementById("date").value = dateTime;
});

function send(formId, formUrl, isLocal = false) {
  const form = document.getElementById(formId);
  const formData = new FormData(form);
  const url = (isLocal ? "https://localhost:44331/api" : "https://www.abadel-develop.net/api") + formUrl;
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  const alertDiv = document.getElementById("alertDiv");
  const alertMsg = document.getElementById("alertMsg");
  const btn = document.getElementById("btnSubmit");
  btn.disabled = true;
  const spinner = document.getElementById("btnSpinner");
  spinner.classList.remove("d-none");
  const btnText = document.getElementById("btnText");
  btnText.classList.add("d-none");
  axios({
    method: "post",
    //url: "https://localhost:44331/api/quantify/add",
    url: url,
    data: data,
  })
    .then(function (response) {
      // handle success
      $(".alert").show();
      alertDiv.classList.remove("alert-danger");
      alertDiv.classList.add("alert-success");
      alertMsg.innerHTML = "Entry added successfully";
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      $(".alert").show();
      alertDiv.classList.add("alert-danger");
      alertDiv.classList.remove("alert-success");
      alertMsg.innerHTML = "" + error;
      console.log(error);
    })
    .then(function () {
      btn.disabled = false;
      spinner.classList.add("d-none");
      btnText.classList.remove("d-none");
      // always executed
    });
}
