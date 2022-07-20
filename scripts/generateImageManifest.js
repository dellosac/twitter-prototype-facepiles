const imageFolder = "./public/images/";
const fs = require("fs");

function getFiles(dir, files_) {
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files) {
    var name = dir + "/" + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
}

const files = getFiles(imageFolder);
const imageJSON = {
  images: files
    .filter((file) => {
      let isImage = file.indexOf(".png") > 0 || file.indexOf(".svg") > 0;

      return isImage;
    })
    .map((img) => {
      return img.replace("./public", "");
    }),
};

let data = JSON.stringify(imageJSON);
fs.writeFileSync('./src/config/imageManifest.json', data);
