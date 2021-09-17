const getProperties = (obj) => {
  let property = {};

  // if a property has schema = it has sub properties
  for (const key in obj) {
    if (key == "_id") continue;
    let tempObj = {};
    let value = {};
    if (obj[key].schema) {
      //   console.log(property + " has schema");
      value = getProperties(obj[key].schema.paths);
    } else {
      if (obj[key].enumValues) {
        if (obj[key].enumValues.length > 0) value = obj[key].enumValues;
      }
    }
    // add type
    let type = obj[key].instance;
    tempObj = { ...tempObj, type: type };
    property[key] = tempObj;
    // add other property, if any
    if (Object.keys(value).length !== 0) {
      // if (value) {
      tempObj = { ...tempObj, [key]: value };
      property = { ...property, [key]: tempObj };
    }
  }

  return property;
};

module.exports = {
  getProperties,
};
