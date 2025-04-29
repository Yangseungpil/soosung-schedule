// app/layout.tsx
import './globals.css'

export const metadata = {
  title: 'SOOSUNG 일정 앱',
  description: '지원 일정 관리',
}

export function generateViewport() {
  return {
    themeColor: ['#2563eb', '#1e40af'],
    width: 'device-width',
    initialScale: 1,
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-gray-100 text-gray-900 min-h-screen">{children}</body>
    </html>
  )
}
