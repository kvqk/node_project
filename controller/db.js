const mongoose = require("mongoose");

const uri = "mongodb+srv://kvhqw:wasthisagame@cluster0.lir2bix.mongodb.net/?retryWrites=true&w=majority"

const connect = async () => {
    try {
        await mongoose.connect(uri)
        console.log("Database is successfuly connected")

    } catch (error) {
        console.log(error)
    }
}
module.exports = connect