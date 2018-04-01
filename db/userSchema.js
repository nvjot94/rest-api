const connection = require("./connection");
const Schema = connection.Schema;

const usersSchema = new Schema({
    id: {
        type: String ,unique:true
    },
    email: {
        type: String
    },
    company_name: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },

    state: {
        type: String
    },
    web: {
        type: String
    },

    zip: {
        type: String
    },
    age: {
        type: String
    }

});
var usersModel = connection.model("users", usersSchema);
module.exports = usersModel;