import jwt from 'jsonwebtoken';
import getAccessSecret from './generateAccessSecret.js';
import getRefreshSecret from './generateRefreshSecret.js';

const createToken = (objectEncoded) => {
    const decoded = objectEncoded.toObject();
    const accessSecret = getAccessSecret();
    const refreshSecret = getRefreshSecret();
    const authToken = {id: decoded._id, role: decoded.role, email: decoded.email};
    const accessToken = jwt.sign({authToken: authToken}, accessSecret, {expiresIn: "24h"});
    const refreshToken = jwt.sign({authToken: authToken}, refreshSecret, {expiresIn: "24h"});

    return {accessToken, refreshToken};
};

export default createToken;