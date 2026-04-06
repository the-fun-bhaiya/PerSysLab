function showPSLAlert(title, descrip, action) {
    Swal.fire({
      title,
      html: `<div style="display:flex;align-items:center">
             <div class="premium-icon premium-icon--warning">
               <i class="fa fa-exclamation-circle"></i>
             </div>
             <div style="flex:1">
               <div class="premium-alert-content">${descrip}</div>
             </div>
           </div>`,
      showCancelButton: true,
      confirmButtonText: "Yup! Do that.",
      cancelButtonText: "No! ",
      reverseButtons: true,
      allowOutsideClick: false,
      allowEscapeKey: true,
      customClass: {
        popup: "premium-alert",
        title: "premium-alert-title",
        content: "premium-alert-content",
        footer: "premium-alert-footer",
        confirmButton: "premium-confirm-btn",
        cancelButton: "premium-cancel-btn",
        icon: "premium-icon",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        action();
      } else if (!result.isConfirmed) {
        showPSLToast("info", "Did not Delete, that one, or any.");
      }
    });
}