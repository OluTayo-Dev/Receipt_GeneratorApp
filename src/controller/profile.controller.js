import User from "../model/users.js";
import Profile from "../model/proile.js";




exports.findAll = (req, res) => {

    Profile.find()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findByName = (req, res) => {
    Profile.findOne({ name: req.params.profileName })
    .populate('user')
    .exec(function (err, profile) {
        if (err){
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Profile not found with given name " + req.params.profileName
                });                
            }
            return res.status(500).send({
                message: "Error retrieving Products with given Company Id " + req.params.profileName
            });
        }
                    
        res.send(profile);
    });
};

// Find all products by a CompanyId
exports.findByCompanyId = (req, res) => {
    Profile.find({ company : req.params.userId })
    .exec(function (err, profile) {
        if (err){
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Products not found with given User Id " + req.params.userId
                });                
            }
            return res.status(500).send({
                message: "Error retrieving Products with given Company Id " + req.params.userId
            });
        }
                    
        res.send(profile);
    });
}