import Product from "../../models/product.model.js";

const deleteProductsById = async (req, res, _next) => {
    try {
        const { productId } = req.params;

        if(!_id){
            return res.status(404).json({
                error: "ID NOT FOUND!",
            });
        }

        if(!verifyDataType(_id, 'string')){
            return res.status(500).json({
                error: "Id is not of String type"
            });
        }

        const deleteProductById = await Product.findByIdAndDelete(productId); 

        return res.status(200).json({
            message: "Deleted!",
            deleteProductById
        });
        
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
};

export default deleteProductsById;