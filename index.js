const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");
const key = "AIzaSyDpI8asggSQ8mPwAJWALVfVzDmHH5g3vRg";
const main = async () => {
  const credentials = require("./tenacious-tiger-399712-291e6a401131.json"); // Path to your JSON key file
  const docId = "1uBWkZpj8aEyLmbs2ueWGf-EItqaC8GP5yjGFFA7Sc-A";

  const serviceAccountAuth = new JWT({
    // env var values here are copied from service account credentials generated by google
    // see "Authentication" section in docs for more info
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  //https://docs.google.com/spreadsheets/d/1wCMJv0ggcLtTaco5ecM8Dfiw5X9T7zig/edit?usp=sharing&ouid=109741944349358400477&rtpof=true&sd=true
  const doc = new GoogleSpreadsheet(docId, serviceAccountAuth);
  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);
  //   await doc.updateProperties({ title: "renamed doc" });

  const sheet = doc.sheetsByIndex[0]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
  console.log(sheet.title);
  console.log(sheet.rowCount);
  console.log(sheet.columnCount);

  await sheet.loadCells(); // Загрузить все ячейки листа

  const numRows = sheet.rowCount;
  const numCols = sheet.columnCount;
  const data = [];
  for (let row = 0; row < numRows; row++) {
    const rowData = [];
    for (let col = 0; col < numCols; col++) {
      const cell = sheet.getCell(row, col);
      rowData.push(cell.value);
    }
    data.push(rowData);
  }
  console.log(`Данные из всей таблицы:`, data);
  //   await doc.deleteSheet({ title: "Новый лист" });

  // await doc.addSheet({ title: "Новый лист" });

  //   const sheetToDelete = doc.sheetsByTitle["Новый лист"];
  //   await sheetToDelete.delete();
};

main();