const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");
const key = "AIzaSyDpI8asggSQ8mPwAJWALVfVzDmHH5g3vRg";
const main = async () => {
  const credentials = require("./tenacious-tiger-399712-291e6a401131.json"); // Path to your JSON key file
  const docId = "1ymWOJvmIUIgCyKSdQ08byAWkOMfbhgL6XlTkTqYqdP8"; //"1uBWkZpj8aEyLmbs2ueWGf-EItqaC8GP5yjGFFA7Sc-A";

  const serviceAccountAuth = new JWT({
    // env var values here are copied from service account credentials generated by google
    // see "Authentication" section in docs for more info
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  //https://docs.google.com/spreadsheets/d/1wCMJv0ggcLtTaco5ecM8Dfiw5X9T7zig/edit?usp=sharing&ouid=109741944349358400477&rtpof=true&sd=true
  const doc = new GoogleSpreadsheet(docId, serviceAccountAuth);

  // Загрузка информации о документе и листах
  await doc.loadInfo();

  console.log("Успешное подключение к Google Sheets!");
  return doc;
};
module.exports = main;
