import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    currency: {type: String, enum: ['RON']},
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    rating: {
      rate: { type: Number },
      count: { type: Number }
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Product', productSchema);
