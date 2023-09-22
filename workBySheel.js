const connectToGoogleSheets = require("./connect");

class Shellwork {
  async initialize() {
    try {
      this.doc = await connectToGoogleSheets();
      console.log("Успешное подключение к Google Sheets!");
    } catch (error) {
      console.error("Произошла ошибка при инициализации:", error);
      throw error;
    }
  }

  async create(name) {
    const sheetNameForAdd = this.doc.sheetsByTitle[name];
    if (sheetNameForAdd) return undefined;
    return await this.doc.addSheet({ title: name });
  }
  async update(oldName, newName) {
    const sheetNameForUpdate = this.doc.sheetsByTitle[oldName];
    if (!sheetNameForUpdate) return undefined;
    return await sheetNameForUpdate.updateProperties({ title: newName });
  }
  async delete(name) {
    const sheetNameForDelete = this.doc.sheetsByTitle[name];
    if (!sheetNameForDelete) return undefined;
    sheetNameForDelete && (await sheetNameForDelete.delete());
  }
}

module.exports = Shellwork;
