export class User {

  constructor(id, name) {
    this.id =this.setData(id);
    this.name = this.setData(name);
  }

  setData(str) {
    return String(str).length > 0 ? str : '';
  }
}