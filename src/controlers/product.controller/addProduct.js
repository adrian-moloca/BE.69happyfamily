import Product from '../../models/product.model.js';

const addProduct = async (req, res, _next) => {
  try {
    const { title, price, description, category, image } = req.body;

    if (
      verifyDataType(title, 'undefined') ||
      verifyDataType(price, 'undefined') ||
      verifyDataType(description, 'undefined') ||
      verifyDataType(category, 'undefined') ||
      verifyDataType(image, 'undefined')
    ) {
      return res.status(400).json({
        error: 'Field missing'
      });
    }

    if (
      !verifyDataType(title, 'string') ||
      !verifyDataType(price, 'number') ||
      !verifyDataType(description, 'string') ||
      !verifyDataType(category, 'string') ||
      !verifyDataType(image, 'string')
    ) {
      return res.status(400).json({
        error: 'Invalid type of'
      });
    }

    const newProduct = new Product({
      title,
      price,
      description,
      category,
      image
    });

    await newProduct
      .save()
      .then((product) => {
        return res.status(200).json({
          message: 'Product added!',
          product
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: err
        });
      });
  } catch (error) {
    console.error(error);
  }
};

export default addProduct;
