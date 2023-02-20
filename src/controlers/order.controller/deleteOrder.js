import orderModel from "../../models/order.model.js";

const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        await orderModel
            .findByIdAndDelete(orderId)
            .catch(() => {
                return res.status(500).json({
                    error: "Couldn't delete order"
                });
            })

            return res.status(200).json({
                message: "Successfully deleted order"
            });

        
    } catch (error) {
        return res.status(500).json({ error: error }); 
    }
};

export default deleteOrder;