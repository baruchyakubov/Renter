import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const USER_KEY = 'user'

var gUser = null

function getUser() {
  return storageService.query(USER_KEY)
    .then((users) => {
      if (!users || !users.length) {
        console.log('No user - creating new user!');
        users = [_createUser('Puki Ben David')];
        storageService.postMany(USER_KEY, users);
      }
      gUser = users[0];
      // [gUser] = users;
      return gUser;
    })
}

function updateUser(user) {
  gUser = user;
  return storageService.put(USER_KEY, user);
}

function setUserActivities(txt, todo) {
  var activity = {
    txt,
    todo,
    at: Date.now()
  }
  const user = JSON.parse(JSON.stringify(gUser))
  user.activities.push(activity)
  // gUser.activities.push(activity)
  // // TODO: Don't user gUser
  return storageService.put(USER_KEY, user);
  // storageService.store(USER_KEY, gUser);

}

// function _loadUser() {
//   var user = storageService.load(USER_KEY);
//   if (!user) {
//     user = _createUser('Puki Ben David')
//     storageService.store(USER_KEY, user)
//   }
//   return user
// }

function _createUser(name) {
  return {
    _id: utilService.makeId(),
    fullName: name,
    activities: [],
    prefs: {
      color: '#303030',
      bgc: '#e1e1e1'
    }
  }
}

export default {
  setUserActivities,
  getUser,
  updateUser
}