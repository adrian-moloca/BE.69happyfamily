import productModel from "../../models/product.model.js";

const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const {
            title,
            price,
            description,
            image,
            category,
            currency
        } = req.body;

        let product = await productModel
            .findById(productId)
            .catch(error => {
                return res.status(500).json({
                    error: error
                });
            });

            if(!product) {
                return res.status(404).json({
                    error: 'Product not found'
                });
            }

            product.title = title ? title : product.title;
            product.price = price ? price : product.price;
            product.description = description ? description : product.description;
            product.image = image ? image : product.image;
            product.category = category ? category : product.category;
            product.currency = currency ? currency : product.currency;

            await product
                .save({
                    modifiedValuesOnly: true
                })
                .then(product => {
                    return res.status(200).json({
                        product
                    });
                })
                .catch(error => {
                    return res.status(500).json({
                        error: error
                    });
                })

    } catch (error) {
        return res.status(500).json({
            error: 'Server Error: ' + error
        })
    }
};

export default updateProduct;
