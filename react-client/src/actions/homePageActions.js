import axios from 'axios';
import firebase from '../firebase/index';

export const attemptLogin = () => (
  dispatch => (
    axios.get('/login')
      .then((res) => {
        if (res.data) {
          dispatch({ type: 'USER_LOGIN', payload: { ...res.data[0] } });
        }
      })
      .catch((err) => {
        console.log(err);
      })
  )
);

const errMessage = message => ({ type: 'ERR_MESSAGE', payload: message });

export const localLogin = (username, password) => (
  dispatch => (
    axios.post('/localLogin', { username, password })
      .then(() => {
        dispatch(attemptLogin());
      })
      .catch((err) => {
        dispatch(errMessage('Please check your credentials and try again'));
        console.log(err);
      })
  )
);


export const localSignup = (username, password) => (
  dispatch => (
    axios.post('/localSignup', { username, password })
      .then((res) => {
        if (!res.data.error) {
          dispatch(localLogin(username, password))
          .then(() => {
              firebase.auth().signInAnonymously(); // needs to be only at successful sign in;
              })
            .then(() => {
              firebase.auth().onAuthStateChanged(user => {
                console.log('userrrrrr', user)
                if(user) {
                 dispatch(setFirebaseUser(user)); 
                } else {
                  console.log('unable to sign user in via Firebase');
                }
              })
            })
        } else {
          dispatch(errMessage(res.data.error));
        }
      })
      .catch((err) => {
        console.log(err);
      })
  )
);

const setFirebaseUser = user => ({ type: 'SET_FIREBASE_USER', payload: user });

// export const setCurrentFirebaseUser = user => {
//   dispatch => (
//     dispatch(setFirebaseUser(user))
//   )
// }

export const updatePushNotificationsToFalse = userID => (
  dispatch => (
    axios.patch('/updatePushNotificationsToFalse', { userID: userID })
      .then(() => { console.log('Succssfully updated user push notification preference to false') })
      .catch((err) => { console.log('Unable to update user push notification preference', err) })
  )
)

export const updatePushNotificationsToTrue = (userID, token) => (
  dispatch => (
    axios.patch('/updatePushNotificationsToTrue', { userID: userID, token: token })
      .then(() => { console.log('Succssfully updated user push notification preference to true') })
      .catch((err) => { console.log('Unable to update user push notification preference', err) })
  )
)

export const unsubscribeFromPushNotifications = userID => (
  dispatch => (
    axios.patch('/unsubscribeFromPushNotifications', { userID: userID })
      .then(() => { console.log('User successfully unsubscribed from push notifications') })
      .catch((err) => { console.log('Unable to unsubscribe user from push notifications') })
  )
)

