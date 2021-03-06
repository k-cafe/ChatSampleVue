import { db } from './database';
import { Comment, User } from '../models'

export class CommentRepository {
  constructor() {
    this.commentsRef = db.collection('comments');
  }

  findAll(crudFunction) {
    return this.commentsRef.orderBy('date', 'asc').onSnapshot(querySnapshot => {
      querySnapshot.docChanges().forEach(change => {
        const comment = new Comment(
          change.doc.id,
          change.doc.data().message,
          new User(change.doc.data().user.uid, change.doc.data().user.displayName, change.doc.data().user.email),
          change.doc.data().date
        );
        crudFunction(change.type, comment);
      });
    });
  }

  add(comment) {
    this.commentsRef.add({...comment});
  }

  remove(comment) {
    this.commentsRef.doc(comment.id).delete();
  }
}
