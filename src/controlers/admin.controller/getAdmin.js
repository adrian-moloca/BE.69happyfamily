import Admin from "../../models/admin.model.js";

const getAdmin = async (_req, res, _next) => {
    try {

        await 
            Admin
                .find()
                .then(admins => {
                    return res.status(200).json({
                        admins,
                        message: "Successful"
                    })
                })
                .catch(() => {
                    return res.status(500).json({
                        error: "Couldn't get admins"
                    })
                });
        
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
};

export default getAdmin;
