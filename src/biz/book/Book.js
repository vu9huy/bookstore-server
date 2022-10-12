const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookUrl: { type: String, required: true, unique: true },
    tag: { type: String, required: true },
    EANUPC: { type: String, requireL: true, },
    aboutAuthor: { type: String, required: true },
    author: { type: String, required: true },
    bookFormat: { type: String, },
    bookName: { type: String, required: true },
    categories: { type: Array, required: true },
    datePublished: { type: String, },
    description: { type: String, },
    imageUrl: { type: String, required: true },
    inLanguage: { type: String, required: true },
    numberOfPages: { type: String, required: true },
    price: { type: Number, required: true },
    publisher: { type: String, required: true },
    review: { type: String, },
    size: { type: String, required: true },
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Book', bookSchema)

const a = {
    "bookUrl": "https://bookshop.org/books/the-heart-of-the-deal/9781639100101",
    "tag": "romance",
    "EANUPC": "9781639100101",
    "aboutAuthor": "Lindsay MacMillan is a writer, businesswoman, and hopelessly hopeful romantic. After growing up in Michigan in the land of cows, cornfields, and kindness, she graduated magna cum laude from Dartmouth College. She was formerly a vice president at Goldman Sachs and has worked in both New York City and London. The Heart of the Deal is her first published novel, and she shares unfiltered poetry and prose on Instagram (@lindsaymacwriting).",
    "author": "Lindsay MacMillan",
    "bookFormat": "Paperback",
    "bookName": "The Heart of the Deal",
    "categories": [
        "Romance - Contemporary",
        "Coming of Age",
        "Friendship"
    ],
    "datePublished": "June 07, 2022",
    "description": "Description Perfect for fans of Emily Giffin and Jojo Moyes, Lindsay MacMillan's debut novel deftly captures the feeling of being adrift in your late twenties, with poignant commentary on female friendships, mental health, and what happiness really looks like. Rae is in a romantic recession. The Wall Street banker is single in New York City and overwhelmed by the pressure to scramble up the corporate and romantic ladders. Feeling her biological clock ticking, she analyzes her love life like a business deal and vows to lock in a husband before her 30th birthday. The Manhattan dating app scene has as many ups and downs as the stock market, and outsourcing dates to an algorithm isn't exactly Rae's idea of romance. She considers cutting her losses, but her friends help her stay invested, boosting her spirits with ice cream and cheap wine that they share in their sixth-floor walk-up while recapping cringe-worthy dates. And then Rae meets Dustin, a poetic soul trapped in a business suit, just like her. She starts to hear wedding bells, but Dustin's struggles with depression will test their relationship, and no amount of financial modeling can project what their future will look like. Can Rae free herself from the idea she had of what thirty was supposed to look like and let love breathe on its own timeline? Or is she too conditioned to stay on the right track to follow her unpaved intuition? Moving and timely, The Heart of the Deal is the story of one woman's reckoning with what success really is in a city, an industry, and a relationship whose low lows continually challenge the enchantment of the high highs.",
    "imageUrl": "https://images-us.bookshop.org/ingram/9781639100101.jpg?height=500&v=v2-f9b0bf4b06067b3cd24fff45e445c6ec",
    "inLanguage": "English",
    "numberOfPages": "352",
    "price": 16.99,
    "publisher": "Alcove Press",
    "review": "Praise for The Heart of the Deal \n An analytic and emotional exploration of love, mental health issues, and what it means to give someone your heart. \n--Kirkus",
    "size": "5.5 X 8.1 X 0.8 inches | 0.9 pounds",
}