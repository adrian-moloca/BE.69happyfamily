import User from "../../models/user.model.js";

const getUser = async (_req, res, _next) => {

try {
    await
        User
            .find()
            .then(user => {
                return res.status(200).json({
                    user
                })
            })
            .catch(error => {
                return res.status(500).json({
                    error
                })
            })
} catch (error) {
    return res.status(500).json({
        error
    })
}
};

export default getUser;
