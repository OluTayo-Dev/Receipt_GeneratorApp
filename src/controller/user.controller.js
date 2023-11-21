import User from "../model/users.js";
import Profile from "../model/proile.js";


exports.init = (req, res) => {
    var user1 = new User({
        username: 'Olusola',
        email: 'olusolatemitayo656@gmail.com',
        password: 'olusola123'
    });

    user1.save(function (err) {
        if(err) return console.error(err.stack)



        console.log('Olusola user is added')


        // user1 now exists, so lets create profile
        var userProfile = new Profile({
            companyName: 'Device Xtra',
            address: 'UI',
            phoneNo: '07064219422',
            plan: 'plan1',
            user: user1._id
        })

        userProfile.save(function(err) {
            if(err) return console.error(err.stack)

            console.log('userProfile is added');
        })

        var user2 = new User({
            username: 'Tobiloba',
            email: 'tobiloba@gmail.com',
            password: 'Tobi12345'
        })

        user2.save(function(err) {
            if(err) return console.error(err.stack)

            console.log("user2 is added")


            var userDetails = new Profile({
                companyName: 'Skillup Africa',
                address: 'Abijo GRA',
                phoneNo: '07023107466',
                plan: 'plan2',
                user: user2._id
            })

            userDetails.save(function(err) {
                if(err) return console.error(err.stack)

                console.log("userDetails is added")
            })
        })


       
    })

    res.send("Done initial Data!");
}

exports.findAll = (req, res) => {
    Company.find()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}