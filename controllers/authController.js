const bcrypt = require('bcrypt');
const { PrismaClient } = require("@prisma/client");
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

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

module.exports = {
    signup,
    // signin,
    // signout
};
