const multer = require("multer");

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb(
			{
				message: 'Unsupported file format',
			},
			false
		);
	}
};


const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
});


const imageUpload = multer({
    storage: multerStorage,
	filter: multerFilter,
});

module.exports = {
    imageUpload
}
