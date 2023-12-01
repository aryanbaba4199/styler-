import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";
import bcrypt from "bcrypt";


export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        try {
          // Find user by email
          const user = await User.findOne({ email });

          if (!user) {
            return Promise.resolve(null); // User not found
          }

          // Compare passwords
          const isValidPassword = await bcrypt.compare(password, user.password);

          if (!isValidPassword) {
            return Promise.resolve(null); // Incorrect password
          }

          // Successful authentication, return the user object
          return Promise.resolve(user);
        } catch (error) {
          console.error("Error during authentication:", error);
          return Promise.resolve(null); // Error during authentication
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // Add other providers as needed (e.g., GitHub, Google)
  ],
  callbacks: {
    async session({ session, token }) {
      // Add custom session handling logic if needed
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.JWT_SECRET,
  // Add other options as needed
});
