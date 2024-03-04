// * 404 FUNCTION * //
function pageNotFound(req, res, next) {
  res.status(404).json({
    success: false,
    data: {
      error: "404",
      message: "PAGE NOT FOUND",
    },
  })
  next()
}

// * EXPORTS * //
module.exports = pageNotFound
