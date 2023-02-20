import Order from "../../models/order.model.js";

const getOrders = async (req, res, next) => {

    try {
        
        await Order
            .find()
            .then((orders) => {
                return res.status(200).json({
                   orders
                  });
            })
            .catch((err) => {
                return res.status(500).json({
                    error: err
                  });
            })
    } catch (error) {
        return res.status(500).json({
            error: error
          });
    }
};

export default getOrders;

