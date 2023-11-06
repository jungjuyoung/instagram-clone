import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";

const authOptions = {
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
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  }
}
const handler = NextAuth(authOptions)

export { authOptions, handler as GET, handler as POST }
