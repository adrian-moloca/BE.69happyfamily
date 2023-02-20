import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    client: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    products: [
        {
            productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
            quantity: {type: Number, required: true}
        }
    ],
    totalPrice: {type: Number, required: true}
},{
    timestamps: true
});

orderSchema.pre('findOne', function(){
    this.populate({
        path: 'client',
        select: ['userName']
    })
    this.populate(
        {
            path: 'products.productId',
            select: ['price', 'title']
        }
    );
});

export default mongoose.model('Order', orderSchema);
