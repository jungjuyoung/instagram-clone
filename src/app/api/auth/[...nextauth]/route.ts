import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import { addUser } from "@/service/user";

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
    async signIn({ user: { id, name, image, email } }) {
      // console.log('id', id, 'name', name, 'email', email)
      // if (!email) { // KaKao는 email이 없을 수 있음.
      //   return false
      // }

      addUser({ id, name: name || '', email: email || `${name}@fakeemail.com`, username: email ? email?.split('@')[0] : `${name?.trim()}` })
      return true
    },
    async session({ session }) {
      // console.log('session', session)
      const user = session?.user
      if (user) {
        session.user = {
          ...user,
          username: user.email?.split('@')[0] || '',
        }
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
  },
  pages: {
    signIn: '/auth/signin',
  }
}
const handler = NextAuth(authOptions)

export { authOptions, handler as GET, handler as POST }
