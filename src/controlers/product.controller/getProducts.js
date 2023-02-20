import Product from "../../models/product.model.js";

const getProducts = async (req, res, next) => {

    try {
        
        await Product
            .find()
            .then((products) => {
                return res.status(200).json({
                    products
                  });
            })
            .catch((error) => {
                return res.status(500).json({
                    error: error
                  });
            })

    } catch (error) {
        return res.status(500).json({
            error: error
          });
    }
};

export default getProducts;