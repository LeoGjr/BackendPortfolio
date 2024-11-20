// pages/api/auth/signup.js

import { mongooseConnect } from '@/lib/mongoose';
import { Profile } from '@/models/Profile';

export default async function handler(req, res) {
  await mongooseConnect();

  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await Profile.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    const newUser = await Profile.create({ email, password });

    res.status(200).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
