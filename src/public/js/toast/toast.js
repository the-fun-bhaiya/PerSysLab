function showPSLToast(type = "info", message) {
  if (!message) return;
  let gradient = "";
  let icon = "";
  switch (type) {
    case "success":
      gradient = "rgba(16, 185, 129, 0.15)";
      icon = '<i class="bi bi-check-circle-fill me-2"></i>';
      break;
    case "error":
      gradient = "rgba(239, 68, 68, 0.15)";
      icon = '<i class="bi bi-exclamation-triangle-fill me-2"></i>';
      break;
    default:
      gradient = "rgba(59, 130, 246, 0.15)";
      icon = '<i class="bi bi-info-circle-fill me-2"></i>';
      break;
  }

  Toastify({
    text: icon +"  "+ message ,
    position: "left",
    gravity: "top",
    escapeMarkup: false,
    duration: 4500,
    close: true,
    stopOnFocus: true,
    className: "psl-glass-toast",
    style: {background: gradient}
  }).showToast();
};