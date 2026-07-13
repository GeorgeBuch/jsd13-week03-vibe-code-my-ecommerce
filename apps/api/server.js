import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webDir = path.resolve(__dirname, '../web');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());
app.use(express.static(webDir));

const userSchema = new mongoose.Schema(
  {
    fullname: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'customer' }
  },
  { collection: 'users' }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: String,
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 }
  },
  { collection: 'products' }
);

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    items: { type: [orderItemSchema], default: [] },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'Preparing' }
  },
  { collection: 'orders' }
);

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);

app.get('/api/health', (req, res) => {
  res.json({ ok: true, database: 'test' });
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().lean();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.use((req, res) => {
  res.sendFile(path.join(webDir, 'index.html'));
});

async function startServer() {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not set');
    }

    await mongoose.connect(MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log('Connected to MongoDB database: test');
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

startServer();
