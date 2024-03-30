import User from '../db/models/userModel.js'
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';


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
    const email = req.body.email;
    try {
        const user = await User.findOne({email: email});
        if(user) {
            sendEmail(user._id, user.email, user.username)
            res.status(200).json({ message: "We sent you a recovery email" });
        } else {
            res.json({message: "Email Not Registered"});
        }
    } catch (error) {
        console.log(error);
    }
}


// function to send Verification Email 
const sendEmail = (id, email, name) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.Email,
            pass: process.env.Pass
        },
    });

    const token = jwt.sign({ id }, process.env.VERIFY_EMAIL, { expiresIn: '5m' })

    const mailOptions = {
        from: process.env.Email,
        to: email,
        subject: 'Verification Email',
        html: `<p> Hello ${name}, to change your password please click on <a href="http://localhost:5173/recoverPassword/${token}">Change Password</a></p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent" + info.response);
        }
    });
}

export const changePassword = async (req, res) => {
    console.log(req.body);
    try {
        const data = req.body.formData;
        if (data.password === data.confPassword) {
            let id;
            jwt.verify(req.body.token, process.env.VERIFY_EMAIL, (err, decoded) => {
                if (err) {
                    res.json({message: "Link Has Been Tampered"})
                }
                // If verification is successful, 'decoded' will contain the payload
                id = decoded.id;
            })
            const result = await User.findByIdAndUpdate(id, { password:data.password})
            if(result){
                res.status(200).json({message: "Updation Success"})
            }
        } else {
            res.json({message: "Passwords do not match"})
        }
    } catch (error) {
        console.log(error);
    }
}