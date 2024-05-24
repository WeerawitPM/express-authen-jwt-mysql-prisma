const bcrypt = require('bcrypt');
const { PrismaClient } = require("@prisma/client");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const prisma = new PrismaClient();

const signup = async (req, res, next) => {
    try {
        const { email, username, password, firstname, lastname } = req.body;

        const hashedPassword = bcrypt.hashSync(password, 10);

        const result = await prisma.user.create({
            data: {
                email: email,
                username: username,
                password: hashedPassword,
                firstname: firstname,
                lastname: lastname
            }
        });

        res.json(result);
    } catch (error) {
        next(error);
    } finally {
        await prisma.$disconnect();
    }
};

const signin = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        // If user does not exist, return an error
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        // If the password is invalid, return an error
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send the token and user details in the response
        res.json({ status: "ok", message: "signin success", token });
    } catch (error) {
        next(error);
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = {
    signup,
    signin,
    // signout
};
