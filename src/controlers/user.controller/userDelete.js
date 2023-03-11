import userModel from "../../models/user.model.js";

const userDelete = async (req, res, _next) => {
    try {

        const { userId } = req.params;

             await userModel
            .findByIdAndDelete(userId)
            .then(() => {
                return res.status(200).json({
                    deleted: "Successfully deleted user"
                });
            })
            .catch(() => {
                return res.status(500).json({
                    error: "Couldn't delete user"
                })
            })

    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
};

export default userDelete;