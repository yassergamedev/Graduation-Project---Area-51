const fs = require('fs');
const mongoose = require('mongoose');
const Image = require('./models/Image');

mongoose.connect("mongodb://127.0.0.1:27017/area51h", {useNewUrlParser : true});

const imgPath = './neon site/user-icon.png'; // Replace this with your own image path

const img = fs.readFileSync(imgPath);
const encode_image = img.toString('base64');

const finalImg = {
  name: 'user-icon.jpg',
  contentType: 'image/png', 
  data: Buffer.from(encode_image, 'base64')
};

Image.create(finalImg)
  .then((image) => {
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
    mongoose.connection.close();
  });
