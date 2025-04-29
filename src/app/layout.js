import './globals.css'

export const metadata = {
  title: '个人网站',
  description: '展示我的IT项目和博客的个人网站',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>
        {children}
      </body>
    </html>
  )
}
