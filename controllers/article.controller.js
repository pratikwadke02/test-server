const db = require('../models');
const Article = db.article;
const { cloudinaryUploadImage } = require('../middleware/cloudinary');


exports.create = async (req, res) => {
    if(!req.body.title || !req.body.desc || !req.body.date || !req.body.time) {
        return res.status(400).send({
            message: "Article content can not be empty"
        });
    }
    if(!req.file){
        return res.status(400).send({
            message: "Article image can not be empty"
        });
    }
    const localPath = `uploads/${req.file.filename}`;
    const uploadedImg = await cloudinaryUploadImage(localPath);
    console.log(uploadedImg.url);
    const article = {
        title: req.body.title,
        desc: req.body.desc,
        image: uploadedImg.url,
        date: req.body.date,
        time: req.body.time
    };
    Article.create(article).then(data => {
        res.send(data);
    }
    ).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the article."
        });
    }
    );
}

exports.findAll = (req, res) => {
    Article.findAll().then(data => {
        res.status(200).json({data});
    }
    ).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving articles."
        });
    }
    );
}
