import db from './database';
import { Comment, User } from '../models'

const commentsRef = db.collection('comments');

export function getAll(crudFunction) {
  return commentsRef.orderBy('date', 'asc').onSnapshot(querySnapshot => {
    querySnapshot.docChanges().forEach(change => {
      const comment = new Comment(
        change.doc.id,
        change.doc.data().message,
        new User(change.doc.data().user.id, change.doc.data().user.name),
        change.doc.data().date
      )
      crudFunction(change.type, comment)
    })
  })
}

export function add(comment) {
  commentsRef.add(Object.assign({}, comment))
}

export function remove(comment) {
  commentsRef.doc(comment.id).delete()
}
