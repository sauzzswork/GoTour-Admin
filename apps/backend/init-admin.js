const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

async function initAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);

  const exists = await Admin.findOne({ email: 'admin@tripzsearch.com' });

  if (!exists) {
    await Admin.create({
      email: 'admin@tripzsearch.com',
      password: 'Admin@123',
    });
    console.log('✅ Admin created');
  } else {
    console.log('ℹ️ Admin already exists');
  }

  process.exit();
}

initAdmin();
