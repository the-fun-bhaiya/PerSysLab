export const globalErr = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const def = {
    msg: "Something went wrong.",
    btnLink: "/",
    btnName: "Home",
  };

  const isProduction = process.env.NODE_ENV === "production";

  if (!isProduction) {
    console.log(err.stack);
  }

  if (req.xhr || req.headers.accept?.includes("application/json")) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.msg || def.msg,
    });
  }

  const msgObj = {
    msg: isProduction ? err.msg : def.msg,
    btnLink: err.btnLink || def.btnLink,
    btnName: err.btnName || def.btnName,
    title: "Uh..Ohhh",
    css: `err/errPage`,
  };

  res.status(err.statusCode || 500).render("errPage/errPage", msgObj);
};
