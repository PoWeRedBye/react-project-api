const fs = require('fs');

exports.savePhotoInServerDirectory = async photo => {
  if (photo) {
    //TODO: надо обавить проверку на объем фотки не больше 10мб
    const new_photo_path = 'D:\\JS-Project\\react-project-api\\file\\' + Date.now() + photo.name;
    const copied_photo = fs.copyFile(photo.path, new_photo_path, err => {
      if (err) throw err;
      my_logger(err);
    });
    const my_photo = {
      name: photo.name,
      path: new_photo_path,
      format_type: photo.type,
    };
    return my_photo;
  } else {
    return null;
  }
};
