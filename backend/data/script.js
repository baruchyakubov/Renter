const fs = require('fs')

const dbService = require('../services/db.service')
const logger = require('../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcrypt')
const userService = require('../api/user/user.service')

// const stays = require('./stay12.json')


// function formatCountries() {

//     var newStays = stays.map(stay => {
//         stay.reviews.forEach(review => {
//             review.rate = 3 + Math.random() * 2
//         })
//         return stay
//     })


//     fs.writeFile('stays12.json', JSON.stringify(newStays, null, 2), 'utf8', err => {
//         if (err) return
//         console.log('hopa!!!');
//     })

// }


// var users
// var imgUrls = ['https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670600139/vnqofp22gvjcc2vzpqpg.jpg', 'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670600127/xg6zpvyi2k9npn1tkxeo.jpg',
//     'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670600114/fx2m2dripuojk20bqf7r.jpg', 'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670600081/svsfqipimlzltegiy70z.jpg',
//     'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670600062/qmm6aqzoqttaptqokyts.jpg', 'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670600032/lycz6rtkp6werlhlagi0.jpg',
//     'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599988/ahobxh6tdwub8unnfiee.jpg', 'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599976/p8yejhoohnsntsmprtln.jpg',
//     'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599962/q3juf40uiluulpyqpnrr.jpg', 'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599952/hp3sa4e3et2fy2xraesw.jpg',
//     'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599930/lzwgmrhufnjaf7bwgaxd.jpg', 'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599922/pshix3peaykwkwlqtavs.jpg',
//     'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599911/hqkh3bgnietvzhnladl1.jpg', 'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599899/kyyucq46zoznoqrpm0zn.jpg',
//     'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599889/dal3siiventnszvebnas.jpg', 'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599864/wmu3q00ol2qnoig1ouyp.jpg',
//     'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599854/wgr0zx8pe2hppl48fyz0.jpg', 'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599841/eha11smggyql9ptxi1l4.jpg',
//     'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599831/ym5kcehmi564pgyujewx.jpg', 'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599822/n8zz7zcxcqddk9p61drb.jpg',
//     'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599813/bhdbdhvz3cpypv5xnaxd.jpg', 'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599801/zktmp8s3sqwdobzwrox8.jpg',
//     'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599766/fyqzvdwwboawqnvhi0we.jpg', 'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599758/swalqjsuirdbbiwmyf1w.jpg',
//     'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599745/vuzsbqfy3c0vwcxuahnk.jpg', 'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599733/co6pdkjymx23q9meoekz.jpg',
//     'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599722/nnjo4eklgjtj0eop9ihy.jpg', 'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599701/lbhcncn2dh8vhhtx89ar.jpg',
//     'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599681/bopvhis1r6qtvxqq3l7c.jpg', 'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599667/iezdcphbfsh01gz5qyji.jpg',
//     'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599659/gxldomroybreiunkag09.jpg', 'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599612/k5dkwo7l4cknlvqj6y9y.jpg',
//     'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599578/ig6mxtuevceox4udo8sp.jpg', 'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599560/fncnlicd8yc5ak0t9xqw.jpg',
//     'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599547/gfqbragcdmf9zj9bs0jj.jpg', 'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599536/euw6qhgm15w9vioqknmk.jpg',
//     'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599523/bxrpfhbpt37qqbgmdqlr.jpg', 'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599504/n5tuliyifsq0vcuhrpqm.jpg',
//     'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599420/ujp2qqvmsdoicg4hmdjf.jpg', 'https://res.cloudinary.com/dgvpl7cdq/image/upload/v1670599373/sb5eofjqdvhdtf0emgje.jpg']

// query()

// async function query() {
//     try {
//         const collection = await dbService.getCollection('user')
//         var user = await collection.findOne({ _id: ObjectId('6390a8fe4887fbe817a811e2') })
//             await update(user)
//     } catch (err) {
//         logger.error('cannot find users', err)
//     }
// }



    // }

//     async function update(user) {
//         try {
//             // peek only updatable fields!
//             const saltRounds = 10
//             const hash = await bcrypt.hash(user.password, saltRounds)
//             user.password = hash
//             await userService.update(user)
//         } catch (err) {
//             throw err
//         }
//     }


// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
// }

