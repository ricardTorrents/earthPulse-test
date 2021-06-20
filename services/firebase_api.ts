import { auth, db } from '../config/firebase';
import { IUser, IUserPositions } from '../src/models';

export const createUser = (user: IUser) => {
  return db
    .collection('users')
    .doc(user.uid)
    .set(user)
    .then((response) => {
      return { status: true };
    })
    .catch((error) => {
      throw error;
    });
};
export const createUserPosition = (uid: string, user: IUserPositions) => {
  return db
    .collection('usersPosition')
    .doc(uid)
    .set(user)
    .then((response) => {
      return { status: true };
    })
    .catch((error) => {
      throw error;
    });
};
export const register_firebase = async (user: IUser, password: string) => {
  return auth
    .createUserWithEmailAndPassword(user.email, password)
    .then(async (response) => {
      user.uid = response?.user?.uid;
      if (user.uid) {
        let latitude = user.latitude;
        let longitude = user.longitude;
        delete user.latitude;
        delete user.longitude;
        let resp = await createUser(user);
        if (resp.status) {
          let userPosition = {
            latitude,
            longitude,
            name: `${user.name} ${user.lastname}`,
          };
          resp = await createUserPosition(user.uid, userPosition);
        }

        return resp;
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const getUser = (uid: string) => {
  return db
    .collection('users')
    .doc(uid)
    .get()
    .then((response) => {
      return response.data() ?? null;
    })
    .catch((error) => {
      throw error;
    });
};

export const getUserPosition = (uid: string) => {
  return db
    .collection('usersPosition')
    .doc(uid)
    .get()
    .then((response) => {
      return response.data() ?? null;
    })
    .catch((error) => {
      throw error;
    });
};
export const login_firebase = (email: string, password: string) => {
  return auth
    .signInWithEmailAndPassword(email, password)
    .then(async (response) => {
      let user = await getUser(response.user.uid);
      let position = await getUserPosition(response.user.uid);

      user['latitude'] = position.latitude;
      user['longitude'] = position.longitude;

      return user;
    })
    .catch((error) => {
      throw error;
    });
};

export const get_users_positions = async () => {
  let positions = [];
  await db
    .collection('usersPosition')
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        positions.push(doc.data());
      });
    })
    .catch((error) => {
      throw error;
    });
  return positions;
};
