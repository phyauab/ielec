const IMAGEKIT_PUBLIC_KEY = process.env.IMAGEKIT_PUBLIC_KEY;
const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY;
const IMAGEKIK_ENDPOINT = process.env.IMAGEKIK_ENDPOINT;

const uploadImage = async (base64Img, fileName) => {
  try {
    let img64 = await toBase64(imgRaw);

    const auth = await api.get("/image/auth");
    // var bodyFormData = new FormData();
    // bodyFormData.append("file", img64);
    // bodyFormData.append("publicKey", "public_qoA5QkcHMyikXP/IYVqqyw8zh0Q=");
    // bodyFormData.append("signature", auth.data.signature);
    // bodyFormData.append("expire", auth.data.expire);
    // bodyFormData.append("token", auth.data.token);
    // bodyFormData.append("fileName", fileName);
    // const response = await axios.post(
    //   "https://upload.imagekit.io/api/v1/files/upload",
    //   bodyFormData
    // );

    const response = imagekit.upload(
      {
        file: base64Img, //required
        fileName: "my_file_name.jpg", //required
      },
      function (error, result) {
        if (error) console.log(error);
        else console.log(result);
      }
    );

    return response.data.url;
  } catch (e) {
    console.log(e.response);
  }
};

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

// const getProperties = (obj) => {
//   let property = {};

//   // if a property has schema = it has sub properties
//   for (const key in obj) {
//     if (key == "_id") continue;
//     let tempObj = {};
//     let value = {};
//     if (obj[key].schema) {
//       value = getProperties(obj[key].schema.paths);
//     } else {
//       if (obj[key].enumValues) {
//         if (obj[key].enumValues.length > 0) value = obj[key].enumValues;
//       }
//     }
//     // add type
//     let type = obj[key].instance;
//     tempObj = { ...tempObj, type: type };
//     property[key] = tempObj;
//     // add other property, if any
//     if (Object.keys(value).length !== 0) {
//       // if (value) {
//       tempObj = { ...tempObj, [key]: value };
//       property = { ...property, [key]: tempObj };
//     }
//   }

//   return property;
// };

module.exports = {
  // getProperties,
  toBase64,
};
