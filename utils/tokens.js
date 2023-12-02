import jwt from "jsonwebtoken";

export const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET,{
        expiresIn: "2d"
    });
}

export const passwordResetToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "6h"
    })
}