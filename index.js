const Shellwork = require("./workBySheel");
const shell = new Shellwork();

const main = async () => {
  await shell.initialize();
  await shell.create("34");
  // await shell.delete("new TEST22");
  await shell.update("34", "35");
};

main();
