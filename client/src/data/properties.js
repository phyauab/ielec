const phoneProperties = {
  colors: ["Black", "White", "Red", "Blue", "Yellow", "Green"],
  ram: [3, 4, 6, 8, 12, 16],
  storage: [32, 64, 128, 256, 512, 1024],
};

const laptopProperties = {
  ram: [4, 8, 16, 32, 64],
  hdd: [128, 256, 512, 1024],
  ssd: [128, 256, 512, 1024],
};

const headphoneProperties = {
  anc: [true, false],
  wired: [true, false],
};

const accessoryProperties = {};

module.exports = {
  phoneProperties,
  laptopProperties,
  headphoneProperties,
};
