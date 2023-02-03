document.getElementById("submit").onclick = (e) => {
  var userName = document.getElementById("userName");
  var pass = document.getElementById("password");
  var checkForm = document.querySelector(".checkForm");

  var error = false;
  var errorUserName = "";
  var errorPass = "";

  if (userName.value === "") {
    errorUserName = checkVar(
      errorUserName,
      "Tên đăng nhập không được bỏ trống",
      userName
    );
    error = true;
  } else {
    //* check user name
    if (userName.value.length > 20) {
      errorUserName = checkVar(
        errorUserName,
        "Tên đăng nhập không vượt quá 20 ký tự",
        userName
      );
      error = true;
    }
  }

  //* check pass
  if (pass.value === "") {
    errorPass = checkVar(errorPass, "Mật khẩu không được bỏ trống", pass);
    error = true;
  }

  //* check error
  if (error == true) {
    e.preventDefault();
    checkForm.style.opacity = "1";
    checkForm.innerHTML = errorUserName + errorPass;
  } else {
    checkForm.style.opacity = "0";
  }
};

function checkVar(nameError, warning, errorInp) {
  nameError = `<div><span>!</span> ${warning}</div>`;
  errorInp.classList.add("error");
  setTimeout(() => {
    errorInp.classList.remove("error");
  }, 3000);
  return nameError;
}
