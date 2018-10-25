import { User } from './user';

export class Comment {
  constructor(id, message, user) {
    this.id = this.getStringData(id);
    this.message = this.getStringData(message);
    this.user = this.getUser(user);
  }

  getStringData(str) {
    return String(str).length > 0 ? String(str) : '';
  }

  getUser(user) {
    return user.id.length > 0 ? user : new User();
  }
}
