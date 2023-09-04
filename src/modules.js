



function VerifyTOKEN(req, res, next) {
    const token = req.headers['x-access-token']
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if ( err ) {
          return req.status(500)
        }
        else {
          req = decoded
        }
        next()
    })
  }





module.exports = {
    VerifyTOKEN,
}


