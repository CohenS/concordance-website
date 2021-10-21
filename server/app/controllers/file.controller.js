var stream = require('stream');
const db = require('../config/db.config.js');
const File = db.files;

exports.uploadFile = (req, res) => {
	File.create({
		type: req.file.mimetype,
		name: req.file.originalname,
		data: req.file.buffer
	}).then(() => {
		// res.send('File uploaded successfully! -> filename = ' + req.file.originalname);
		res.send('File uploaded successfully! -> filename =');
	})
}

exports.listAllFiles = (req, res) => {
	File.findAll({attributes: ['data']}).then(files => {
	  console.log(files)
	  var reader = new FileReader();

	});
}

exports.downloadFile = (req, res) => {
	File.findById(req.params.id).then(file => {
		var fileContents = Buffer.from(file.data, "base64");
		var readStream = new stream.PassThrough();
		readStream.end(fileContents);
		
		res.set('Content-disposition', 'attachment; filename=' + file.name);
		res.set('Content-Type', file.type);

		readStream.pipe(res);
	})
}
exports.SearchFile = (req, res) => {
	File.findById(req.body.slug === slug).then(file => {
		var SearchFileContents = Buffer.from(file.data, "base64");
		var readStream = new stream.PassThrough();
		readStream.end(fileContents);
		
		res.set('Content-disposition', 'attachment; filename=' + file.name);
		res.set('Content-Type', file.type);

		readStream.pipe(res);
	})
}