// pages/api/auth/[...nextauth].js
import connectToDatabase from '@/lib/mongodb';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const db = await connectToDatabase();
        const collection = db.collection('admin');

        const user = await collection.findOne({ email: credentials.email });

        if (user && user.password === credentials.password) {
          return { id: user._id, email: user.email };
        }
        return null;
      },
    }),
  ],
  database: process.env.MONGODB_URI,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id; // Add user name to token
      }
      return token;
    },
    async session({ session, token }) {
      session.user._id = token._id; // Set the session user's name
      return session;
    },
  },

  pages: {
    signIn: '/auth/signin',
  },
});
