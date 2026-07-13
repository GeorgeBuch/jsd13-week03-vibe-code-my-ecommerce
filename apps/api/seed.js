import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    fullname: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'customer' }
  },
  { collection: 'users' }
);

const productSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
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
    _id: mongoose.Schema.Types.ObjectId,
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

const users = [
  {
    _id: new mongoose.Types.ObjectId('66b1a8b5c9f4d2a123456701'),
    fullname: 'สมชาย ใจดี',
    email: 'somchai@example.com',
    password: '123456',
    role: 'customer'
  },
  {
    _id: new mongoose.Types.ObjectId('66b1a8b5c9f4d2a123456702'),
    fullname: 'สมหญิง สุขใจ',
    email: 'somying@example.com',
    password: '123456',
    role: 'customer'
  }
];

const products = [
  {
    _id: new mongoose.Types.ObjectId('66b1a8b5c9f4d2a123456601'),
    name: 'Essential Oversized Tee',
    category: 'T-Shirt',
    price: 390,
    stock: 30
  },
  {
    _id: new mongoose.Types.ObjectId('66b1a8b5c9f4d2a123456602'),
    name: 'Cargo Pants',
    category: 'Pants',
    price: 790,
    stock: 15
  },
  {
    _id: new mongoose.Types.ObjectId('66b1a8b5c9f4d2a123456603'),
    name: 'Classic Hoodie',
    category: 'Hoodie',
    price: 890,
    stock: 20
  }
];

const orders = [
  {
    _id: new mongoose.Types.ObjectId('66b1a8b5c9f4d2a123456801'),
    userId: new mongoose.Types.ObjectId('66b1a8b5c9f4d2a123456701'),
    items: [
      {
        productId: new mongoose.Types.ObjectId('66b1a8b5c9f4d2a123456601'),
        productName: 'Essential Oversized Tee',
        quantity: 2,
        price: 390
      },
      {
        productId: new mongoose.Types.ObjectId('66b1a8b5c9f4d2a123456602'),
        productName: 'Cargo Pants',
        quantity: 1,
        price: 790
      }
    ],
    totalPrice: 1570,
    status: 'Preparing'
  },
  {
    _id: new mongoose.Types.ObjectId('66b1a8b5c9f4d2a123456802'),
    userId: new mongoose.Types.ObjectId('66b1a8b5c9f4d2a123456702'),
    items: [
      {
        productId: new mongoose.Types.ObjectId('66b1a8b5c9f4d2a123456603'),
        productName: 'Classic Hoodie',
        quantity: 1,
        price: 890
      }
    ],
    totalPrice: 890,
    status: 'Delivered'
  }
];

async function seed() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not set');
  }

  await mongoose.connect(MONGODB_URI);
  await Promise.all([
    User.deleteMany({}),
    Product.deleteMany({}),
    Order.deleteMany({})
  ]);

  await User.insertMany(users);
  await Product.insertMany(products);
  await Order.insertMany(orders);

  console.log('Seed completed');
  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error('Seed failed:', error.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
