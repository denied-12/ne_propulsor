import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Education Loan System',
  description: 'Sistema de educación financiera',
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
