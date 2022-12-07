import stays from '../data/stay.json' assert {type: 'json'}
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'stay'

export const stayService = {
  query,
  getById,
  save,
  remove,
  getEmptyStay,
  addStayMsg,
  saveForm,
  getEmptyForm
}
window.cs = stayService

const gStays = stays
console.log(gStays);

_createStays()

function _createStays() {

}

async function query(filterBy = { country: '', label: '' }) {
  var stays = await storageService.query(STORAGE_KEY)
  if (filterBy.country) {
    const regex = new RegExp(filterBy.country, 'i')
    stays = stays.filter(stay => regex.test(stay.name))
  }
  if (filterBy.label) {
    stays = stays.filter(stay => stay.labels.includes(filterBy.label))
  }
  return stays
}

function getById(stayId) {
  return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
  await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
  var savedstay
  if (stay._id) {
    savedstay = await storageService.put(STORAGE_KEY, stay)
  } else {
    // Later, owner is set by the backend
    stay.host = userService.getLoggedinUser()
    savedstay = await storageService.post(STORAGE_KEY, stay)
  }
  return savedstay
}

async function addStayMsg(stayId, txt) {
  // Later, this is all done by the backend
  const stay = await getById(stayId)
  if (!stay.msgs) stay.msgs = []

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt
  }
  stay.msgs.push(msg)
  await storageService.put(STORAGE_KEY, stay)

  return msg
}


async function saveForm(form) {
  try {
    await new Promise((resolve, reject) => {
      form.status= 'pending'
      form.createdAt = Date.now()
      form._id = utilService.makeId()
      let orders = utilService.loadFromStorage('Orders')
      if (!orders || !orders.length) {
        orders = []
        orders.push(form)
        resolve(utilService.saveToStorage('Orders', orders))
      }
      else {
        orders.push(form)
        resolve(utilService.saveToStorage('Orders', orders))
      }
    })
    return form
  }
  catch {
    throw err
  }
}

function getEmptyForm() {
  return {
    startDate: '',
    endDate: '',
    guests: {
      pets: 0,
      children: 0,
      infants: 0,
      adults: 0
    },
    stay: {
      _id: "",
      name: "",
      price: ''
    }
    ,totalPrice: '',
  }
}

function getEmptyStay() {
  return {
    name: "Ribeira Charming Duplex",
    type: "House",
    imgUrls: ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "otherImg.jpg"],
    price: 80.00,
    summary: "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
    capacity: 8,
    amenities: [
      "TV",
      "Wifi",
      "Kitchen",
      "Smoking allowed",
      "Pets allowed",
      "Cooking basics"
    ],
    labels: [
      "Top of the world",
      "Trending",
      "Play",
      "Tropical"
    ],
    host: {
      _id: "u101",
      fullname: "Davit Pok",
      imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
    },
    loc: {
      country: "Portugal",
      countryCode: "PT",
      city: "Porto",
      address: "17 Kombo st",
      lat: -8.61308,
      lng: 41.1413
    },
    reviews: [
      {
        id: "madeId",
        txt: "Very helpful hosts. Cooked traditional...",
        rate: 4,
        by: {
          _id: "u102",
          fullname: "user2",
          imgUrl: "/img/img2.jpg"
        }
      }
    ],
    likedByUsers: ['mini-user'] // for user-wishlist : use $in
  }
}





// TEST DATA
// ;(async ()=>{
//     await storageService.post(STORAGE_KEY, {vendor: 'Subali Karov 1', price: 180})
//     await storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 240})
// })()