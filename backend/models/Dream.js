import mongoose from 'mongoose';

const dreamSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  mood: { type: String, default: 'neutral' },
  isLucid: { type: Boolean, default: false }
}, { timestamps: true });

const Dream = mongoose.model('Dream', dreamSchema);
export default Dream;