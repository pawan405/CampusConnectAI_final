import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_ID !== "YOUR_ACTUAL_GOOGLE_CLIENT_ID" &&
    process.env.GOOGLE_CLIENT_ID !== "your-google-client-id"
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // For demo, always return the demo user
        return {
          id: "demo",
          name: "Demo User",
          email: "demo@campusconnect.ai",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Demo",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.accessToken = account.access_token;
        token.id = profile.sub;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  events: {
    async signIn(message) {
      if (
        !process.env.GOOGLE_CLIENT_ID &&
        message.account?.provider === "google"
      ) {
        // Simulate successful sign in
        console.log("Demo Google sign-in");
      }
    },
  },
});

export { handler as GET, handler as POST };
