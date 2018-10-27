import { User } from './user';

export class Comment {
  constructor(id, message, user, date) {
    this.id = this.getStringData(id);
    this.message = this.getStringData(message);
    this.user = this.getUser(user);
    this.date = this.getDate(date);
  }

  getStringData(str) {
    return str && String(str).length > 0 ? String(str) : '';
  }

  getUser(user) {
    return user && user.id.length > 0 ? user : new User();
  }

  getDate(date) {
    return date && String(date).length > 0 ? date : new Date();
  }
}
