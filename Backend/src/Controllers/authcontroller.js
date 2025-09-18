const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

async function userRegister(req, res) {
    const { fullName: { firstName, lastName }, email, password } = req.body;

    const isUser = await userModel.findOne({
        email: email
    })

    if (isUser) {
        return res.status(401).json({
            message: "User alread exists"
        })
    }

    const hashPass = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        email: email,
        fullName: {
            firstName, lastName
        },
        password: hashPass
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // true only if using HTTPS
        sameSite: 'lax'
    })


    return res.status(201).json({
        message: "User created sucessfully",
        user: {
            fullName: user.fullName,
            email: user.email,
            _id: user._id
        }
    })

}

async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email: email
    })

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // true only if using HTTPS
        sameSite: 'lax'
    })

    res.status(200).json({
        message: "user Logged in ",
        user: {
            fullName: user.fullName,
            email: user.email,
            _id: user._id
        }
    })

}

//to fetch users
async function getUser(req, res) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id).select("-password"); // exclude password

        if (!user) {
            return res.status(404).json({
                message: "User does not exist",
            });
        }

        return res.status(200).json({
            message: "User fetched successfully",
            user,
        });
    } catch (error) {
        console.error("Error in getUser:", error);
        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}


async function logout(req, res) {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
        });

        return res.status(200).json({
            message: "Logged out successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error during logout",
            error: error.message,
        });
    }
}

module.exports = { userRegister, loginUser, getUser, logout }