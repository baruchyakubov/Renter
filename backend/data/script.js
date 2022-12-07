const fs = require('fs')

const stays = require('./stay12.json')

formatCountries()

function formatCountries() {

    var newStays = stays.map(stay => {
        stay.reviews.forEach(review =>{
            review.rate = 3 + Math.random()*2
        })
        return stay
    })


    fs.writeFile('stays12.json', JSON.stringify(newStays, null, 2), 'utf8', err => {
        if (err) return
        console.log('hopa!!!');
    })

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
  
