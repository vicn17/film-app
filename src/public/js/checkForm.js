//* hàm check lỗi
function checkError(textError) {
  var error = document.querySelector(".filterError");
  var text = `<span>!</span> ${textError} <br /><br />`;
  error.style.visibility = "visible";
  error.style.opacity = 1;
  // setTimeout(() => {
  //   error.style.visibility = "hidden";
  // }, 3000);
  return text;
}

//* Check form add category
if (document.querySelector("#formLoginViflix")) {
  document.querySelector("#formLoginViflix").onclick = (e) => {
    var acc_email = document.getElementById("acc_email");
    var acc_pass = document.getElementById("acc_pass");
    var error = false;
    var checkEmail = "";
    var checkPass = "";

    //* Check email
    if (acc_email.value == "") {
      checkEmail = checkError("Email không được bỏ trống.");
      error = true;
    }

    //* Check confirm password
    if (acc_pass.value == "") {
      checkPass = checkError("Password không được bỏ trống.");
      error = true;
    }

    //* Hiển thị lỗi
    if (error == true) {
      e.preventDefault();
      document.querySelector(".textError").innerHTML = checkEmail + checkPass;
    } else {
      loading.style.visibility = "visible";
    }
  };
}

// //* Check form add product
// if (document.querySelector("#addProduct")) {
//   document.querySelector("#addProduct").onclick = (e) => {
//     var category = document.getElementById("cate");
//     var prd_name = document.getElementById("prd_name");
//     var prd_price = document.getElementById("pri");
//     var prd_status = document.getElementById("sta");
//     var prd_img = document.getElementById("upload-product");
//     var error = false;
//     var check_category = "";
//     var check_prd_name = "";
//     var check_prd_price = "";
//     var check_prd_status = "";
//     var check_prd_img = "";

//     //* Check category
//     if (category.value == "") {
//       check_category = checkError("Hãy chọn danh mục.");
//       error = true;
//     }

//     //* Check name product
//     if (prd_name.value == "") {
//       check_prd_name = checkError("Tên sản phẩm không được bỏ trống.");
//       error = true;
//     }

//     //* Check price product
//     if (prd_price.value == "") {
//       check_prd_price = checkError("Giá sản phẩm không được bỏ trống.");
//       error = true;
//     }

//     //* Check status product
//     if (prd_status.value == "") {
//       check_prd_status = checkError("Hãy chọn trạng thái cho sản phẩm.");
//       error = true;
//     }

//     //* Check img product
//     if (prd_img.value == "") {
//       check_prd_img = checkError("Hãy chọn ảnh chính cho sản phẩm.");
//       error = true;
//     }

//     //* Hiển thị lỗi
//     if (error == true) {
//       e.preventDefault();
//       document.querySelector(".textError").innerHTML =
//         check_category +
//         check_prd_name +
//         check_prd_price +
//         check_prd_status +
//         check_prd_img;
//     } else {
//       var loading = document.querySelector(".loading");
//       loading.style.visibility = "visible";
//     }
//   };
// }

//* Remove error
document.getElementById("backError").onclick = (e) => {
  e.preventDefault();
  var fillterError = document.querySelector(".filterError");
  fillterError.style.opacity = 0;
  fillterError.style.visibility = "hidden";
};
document.querySelector(".filterError").onclick = () => {
  var fillterError = document.querySelector(".filterError");
  fillterError.style.opacity = 0;
  fillterError.style.visibility = "hidden";
};
