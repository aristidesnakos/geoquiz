import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GeoQuiz',
  description: 'Test your knowledge of world geography',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}