import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    age: {type: Number, required: true},
    password: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    vaccinated: { type: Boolean, default: false },
    loggedIn: {type: Boolean, default: false},
  },
  {
    timestamps: true
  }
);

export default mongoose.model('User', userSchema);
