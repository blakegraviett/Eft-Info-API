// * AYSNCWRAPPER * //
function aysncwrapper(callbackfn) {
    return async (req, res, next) => {
        try {
            await callbackfn(req, res, next)
        }
        catch(err) {
            res.status(400).json({
                success: false,
                data: {
                    message: "Something went wrong",
                    error: err,
                }
            })
        }
   };
}

// * EXPORTS * //
module.exports = aysncwrapper