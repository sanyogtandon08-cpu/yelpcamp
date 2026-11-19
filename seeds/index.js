const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR USER ID
            author: '6ab54769365350f7b4d4e74e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam veritatis repellendus placeat officiis soluta voluptatum nostrum, enim atque amet nulla aliquam a iure? Odio aut obcaecati ad veritatis laboriosam dolores!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                url: 'https://res.cloudinary.com/zu4i9f0b/image/upload/v1790519078/YelpCamp/fkfozeymmljgiudpnq9h.jpg',
                filename: 'YelpCamp/fkfozeymmljgiudpnq9h'
                },
                {
                url: 'https://res.cloudinary.com/zu4i9f0b/image/upload/v1790519077/YelpCamp/o0fokapap9zopib6vrlf.jpg',
                filename: 'YelpCamp/o0fokapap9zopib6vrlf'
                }
            ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})