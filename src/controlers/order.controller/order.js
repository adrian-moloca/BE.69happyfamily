import Order from "../../models/order.model.js";
import Product from "../../models/product.model.js";
import User from "../../models/user.model.js";

const createOrder = async (req, res, next) => {
    try {

        const {client, products} = req.body;
        
        if((typeof client) === 'undefined' || (typeof products) === 'undefined'){
            return res.status(400).json({
                error: 'Field missing'
              });
        }

        if((typeof client) !== 'string' || (typeof products) !== 'object'){
            return res.status(400).json({
                error: 'Invalid data type drq'
              });
        }

        const clientExists = await User.findById(client);

        if(!clientExists){
            return res.status(404).json({
                error: 'Clientu ii mort coaie'
              });
        }

        let invalidProduct = false;
        products.map(product => {
            if((typeof product.productId) !== 'string' || (typeof product.quantity) !== "number"){
                invalidProduct = true;
            }
        });

        if(invalidProduct){
            return res.status(400).json({
                error: 'Invalid data type drq'
              });
        }

        let totalPrice = 0;

        for(let i = 0; i < products.length; i++){
            const productExists = await Product.findById(products[i].productId);
            if(!productExists){
                return res.status(404).json({
                    error: 'Product not found'
                  });
            }
            totalPrice += (productExists.price * products[i].quantity);
        };

        const newOrder = new Order({
            client,
            products,
            totalPrice
        });

        await newOrder
            .save()
            .then((order) => {
               return res.status(201).json({
                    message: 'Order placed',
                    order
                  });
            })
            .catch((err) => {
                return res.status(500).json({
                    error: err
                  });
            })

    } catch (error) {
        console.error(error);
    }
};

export default createOrder;
