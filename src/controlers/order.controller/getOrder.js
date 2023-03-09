import orderModel from "../../models/order.model.js";

const getOrder = async (req, res) => {
    try {

        const { orderId } = req.params;

        await orderModel
            .findOne({_id: orderId})
            .then((order) => {
                if(!order){
                    return res.status(404).json({
                        error: "Not found"
                    });
                }

                return res.status(200).json({
                    order: order
                });
            })
            .catch(error => {
                return res.status(500).json({error: error});
            })
        
    } catch (error) {
        return res.status(500).json({error: error});
    }
};

export default getOrder;
