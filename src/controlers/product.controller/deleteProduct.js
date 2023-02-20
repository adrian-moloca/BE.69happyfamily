import productModel from "../../models/product.model.js";

const deleteProduct = async (req, res) => {
    try {

        const { productId } = req.params;

        await productModel
            .findByIdAndDelete(productId)
            .then(product => {
                if(!product){
                    return res.status(404).json({ error: 'prod. already deleted' });
                }
                return res.status(200).json({
                    message: "product deleted"
                })
            })
            .catch(error => {
                return res.status(500).json({
                    error: error
                });
            })
        
    } catch (error) {
        return res.status(500).json({error: error});
    }
};

export default deleteProduct;