export const home = (req, res) => {
  const msg = req.flash("info")
  res.render("home/home", {msg, title: "PerSysLab | The Lab for Your System", css: "home/home"})
}