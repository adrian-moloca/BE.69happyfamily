import 'dotenv/config';
import crypto from 'crypto';

const getAccessSecret = () => {
    const accessSecret = process.env.ACCESS_SECRET;
    const hash = crypto.createHmac('sha256', accessSecret).update(process.env.UPDATE_SECRET).digest('hex');

    return hash;
};

export default getAccessSecret;
