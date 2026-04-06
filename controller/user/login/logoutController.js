export const logout = (req, res) => {
  if (!req.session) return res.redirect("/");
  req.flash("info", "Done. Logged Out successfully, See Ya 👋.");
  req.session.destroy((err) => {
    console.log(err);
    if (err)
      return res.json({
        msg: "That's Impossible... Our Girl couldn't.. log you out. (it's her job) please try again",
        msgType: "error",
      });
  });
  res.clearCookie("cookiebi", { path: "/user" });
  res.redirect("/");
};
