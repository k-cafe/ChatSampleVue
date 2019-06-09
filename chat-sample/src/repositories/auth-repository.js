import { auth } from './database';
import { User } from '../models/user';

export class AuthRepository {

    async signInWithEmailAndPassword(email, password) {
      const user = await auth.signInWithEmailAndPassword(email, password)
                    .then(credentials => credentials.user)
                    .then(user => new User(user.uid, user.displayName, user.email))
                    .catch(error => null);
      return user;
    }

    signOut() {
        auth.signOut();
    }
}
