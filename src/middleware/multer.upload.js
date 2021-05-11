const multer = require('multer');

const upload = multer({
    limits: {
        fileSize: 100000000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})
const uploadFile = upload.single('file')
module.exports = uploadFile