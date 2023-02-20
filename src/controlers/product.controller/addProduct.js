import Product from '../../models/product.model.js';

const addProduct = async (req, res, next) => {
  try {
    const { title, price, description, category, image } = req.body;

    if (
      (typeof title) === 'undefined' ||
      (typeof price) === 'undefined' ||
      (typeof description) === 'undefined' ||
      (typeof category) === 'undefined' ||
      (typeof image) === 'undefined'
    ) {
      return res.status(400).json({
        error: 'Field missing'
      });
    }

    if (
      (typeof title) !== 'string' ||
      (typeof price) !== 'number' ||
      (typeof description) !== 'string' ||
      (typeof category) !== 'string' ||
      (typeof image) !== 'string'
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
