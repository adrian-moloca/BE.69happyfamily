import 'dotenv/config';
import crypto from 'crypto';

const getRefreshSecret = () => {
    const refreshSecret = process.env.REFRESH_SECRET;
    const hash = crypto.createHmac('sha256', refreshSecret).update(process.env.UPDATE_REFRESH_SECRET).digest('hex');

    return hash;
};

export default getRefreshSecret;
