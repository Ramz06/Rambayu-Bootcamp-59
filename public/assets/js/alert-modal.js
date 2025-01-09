function unauthorizedAlert() {
  Swal.fire({
    title: "Error!",
    text: "You need to login to access this page.",
    icon: "error",
    showCloseButton: true, // Menampilkan tombol silang
    confirmButtonText: "Login", // Mengganti teks tombol konfirmasi
    customClass: {
      popup: "my-popup",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // Redirect ke halaman /users/register
      window.location.href = "/users/login";
    }
  });
}

async function confirmationAlert() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  const result = await swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

  return result;
}

function successDeleteBlog() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success mx-2",
      cancelButton: "btn btn-danger mx-2",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons.fire({
    title: "Deleted!",
    text: "Your file has been deleted.",
    icon: "success",
  });
}

function successLogoutUser() {
  Swal.fire({
    title: "Logout",
    text: "success to logout account",
    icon: "success",
  });
}

function cancelDeleteBlog() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons.fire({
    title: "Cancelled",
    text: "Your imaginary file is safe :)",
    icon: "error",
  });
}

function forbiddenAlert() {
    Swal.fire({
        title: "Forbidden",
        text: "You are not the author",
        icon: "warning",
      });
}

export default {
    unauthorizedAlert,
    confirmationAlert,
    successDeleteBlog,
    cancelDeleteBlog,
    forbiddenAlert,
    successLogoutUser
}


