const ProfileModel = require('../models/ProfileModel');

function saveProfile (profileObj) {
    return new Promise((resolve, reject) => {
        ProfileModel.create(profileObj).then(response => {
            return resolve(response);
        }).catch(err => {
            console.log(err);
            return reject(err);
        });
    });
}

module.exports = {
    saveProfile
};
