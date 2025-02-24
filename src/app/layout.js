import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'michill - 女性専用サロン',
  description: '名古屋市名東区の女性専用美容室michillの求人サイトです。',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}