export const capitalize = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const bufferToImage = (src) => {
  var base64String = btoa(
    new Uint8Array(src.data).reduce(function (data, byte) {
      return data + String.fromCharCode(byte);
    }, "")
  );
  var img = `data:image/png;base64,${base64String}`;
  return img;
};
