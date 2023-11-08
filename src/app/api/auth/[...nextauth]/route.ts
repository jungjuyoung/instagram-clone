import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || ''
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || '',
      clientSecret: process.env.NAVER_CLIENT_SECRET || ''
    })
  ],
  callbacks: {
    async session({ session }) {
      const user = session?.user
      console.log('route session', session)
      if (user) {
        session.user = {
          ...user,
          username: user.email?.split('@')[0] || '',
        }
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
  }
}
const handler = NextAuth(authOptions)

export { authOptions, handler as GET, handler as POST }
