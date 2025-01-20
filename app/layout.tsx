import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'prestamo propulsor',
  description: 'Sistema de préstamos de propulsores',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
