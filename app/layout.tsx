// layout.tsx
import './globals.css'

export const metadata = {
  title: 'SOOSUNG 일정 앱',
  description: '직원 일정 관리',
  themeColor: '#2563eb',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head />
      <body className="bg-gray-100 text-gray-900 min-h-screen">{children}</body>
    </html>
  );
}
