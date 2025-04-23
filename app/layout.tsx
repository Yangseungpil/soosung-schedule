<<<<<<< HEAD
import './globals.css';
=======
import './globals.css'

export const metadata = {
  title: 'SOOSUNG 일정 앱',
  description: '직원 일정 관리',
  themeColor: '#2563eb',
}
>>>>>>> c425896ebb6aa5cac1e78226dba0c5f612d00537

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
<<<<<<< HEAD
      <body>{children}</body>
    </html>
  );
=======
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon-192.png" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body>{children}</body>
    </html>
  )
>>>>>>> c425896ebb6aa5cac1e78226dba0c5f612d00537
}
