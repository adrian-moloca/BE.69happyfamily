import adminModel from "../../models/admin.model.js";

const deleteAdmin = async (req, res, _next) => {

try {

const { adminId } = req.params;

await adminModel
    .findByIdAndDelete(adminId)
    .then(() => {
        return res.status(200).json({
        message: "Successfully deleted admin user"
    })})
    .catch(() => {
        return res.status(500).json({
            message: "Error on deletion"
        }
    )});
    
} catch (error) {
    return res.status(500).json({
        error: error
    });
}
};

export default deleteAdmin;
