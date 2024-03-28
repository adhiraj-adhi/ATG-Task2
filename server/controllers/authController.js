import User from '../db/models/userModel.js'



// REGISTER CONTROLLER
export const createUser = async (req, res) => {
    const data = req.body;
    const user = {
        username: data.username,
        email: data.email,
        password: data.password,
        profilePicture: req.file.filename,
        about: data.about,
        city: data.city,
        relationship: data.relationship
    }
    try {
        if(data.confPassword===data.password){
            try {
                const result = await User.create(user);
                if (result) {
                    // create token here not done for now...
                    res.status(200).json({
                        message: {
                            id: result._id,
                            username: result.username,
                            email: result.email,
                            profilePicture: result.profilePicture,
                            city: result.city,
                            about: result.about,
                            relationship: result.relationship
                        }
                    });
                    res.status(201).json({ message: "User Creation Success", id: result._id });
                } else {
                    res.status(400).json({ errorMessage: "User Creation Failed" });
                }
            }
            catch (error) {
                console.log(error);
            }
        } else {
            throw new Error("Passwords must be same");
        }
    } 
    catch (error) {
        console.log(error);
    }
}

// LOGIN CONTROLLER
export const userLogin = async (req, res) => {
    const data = req.body;
    const username = data.username;
    console.log(data.password);
    try {
        const user = await User.findOne({ username: username });
        if (user) {
            if(user.password === data.password){
                // create token here not done for now...
                res.status(200).json({
                    message: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        profilePicture: user.profilePicture,
                        city: user.city,
                        about: user.about,
                        relationship: user.relationship
                    }
                });
            } else {
                res.status(401).json({errorMessage: "No such user"})
            }
        } else {
            res.status(401).json({errorMessage: "No such user"})
        }
    }
    catch (error) {
        console.log(error);
    }
}


// FORGOT PASSWORD CONTROLLER
export const forgotPassword = async (req, res) => {
    res.send("Forgot Password");
}