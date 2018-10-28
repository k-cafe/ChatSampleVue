import db from './database';
import { Comment, User } from '../models'

const commentsRef = db.collection('comments');

export function getAll(crudFunction) {
  return commentsRef.orderBy('date', 'asc').onSnapshot(querySnapshot => {
    querySnapshot.docChanges().forEach(change => {
      const payload = new Comment(
        change.doc.id,
        change.doc.data().message,
        new User(change.doc.data().user.id, change.doc.data().user.name),
        change.doc.data().date
      )
      crudFunction(change.type, payload)
    })
  })
}

export function add(payload) {
  commentsRef.add(Object.assign({}, payload))
}

export function remove(payload) {
  commentsRef.doc(payload.id).delete()
}
