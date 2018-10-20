export class User {
  static NONE = new User('', '');
  constructor(id, name) {
    this.id =this.getSpaceIfNeeded(id);
    this.name = this.getSpaceIfNeeded(name);
  }

  getSpaceIfNeeded(str) {
    return String(str).length > 0 ? str : '';
  }
}