import User from "../models/user";

function findAll() {
    return User.findAll();
}


export default { findAll };
