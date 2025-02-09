import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nequ¡-Propulsor',
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
