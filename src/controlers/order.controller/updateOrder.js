import orderModel from '../../models/order.model.js';
// import Order from '../../models/order.model.js';
import productModel from '../../models/product.model.js';

const updateCommand = async (req, res) => {
  try {
    const { orderId } = req.params;

    const { productId, quantity } = req.body;

    let order = await orderModel.findById(orderId).catch((error) => {
      return res.status(500).json({
        error: error
      });
    });

    if (!order) {
      return res.status(404).json({
        error: 'not found'
      });
    }

    if (!verifyDataType(productId, 'string') || !verifyDataType(quantity, 'number')) {
      return res.status(400).json({
        error: 'Bad type'
      });
    }

    const productToUpdate = await productModel.findById(productId);

    if (!productToUpdate) {
      return res.status(404).json({
        error: 'product not found'
      });
    }

    if(order.products.length === 0){
        console.log('here');
            const productToAdd = {
                productId,
                quantity
            };
            order.products.push(productToAdd);
            order.totalPrice += productToUpdate.price * quantity;
    }

    order.products.map(async (product) => {
      if (product.productId.toString() === productId.toString()) {
        order.totalPrice -= productToUpdate.price * product.quantity;
        product.quantity = quantity;
        order.totalPrice += productToUpdate.price * quantity;
        }
        else {
            console.log('here');
            const productToAdd = {
                productId,
                quantity
            };
            order.products.push(productToAdd);
            order.totalPrice += productToUpdate.price * quantity;
        }
});

    await order
      .save({
        validateModifiedOnly: true
      })
      .then((order) => {
        return res.status(200).json({
          order
        });
      })
      .catch((error) => {
        return res.status(500).json({
          error: error
        });
      });
  } catch (error) {
    return res.status(500).json({
      error: error
    });
  }
};

export default updateCommand;
