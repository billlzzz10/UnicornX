import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'
import Navigation from '../components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UnicornX OS - พันธมิตรผู้ร่วมสร้างการเติบโต',
  description: 'แพลตฟอร์มที่ปฏิวัติการทำงานสำหรับผู้สร้างสรรค์ที่มีความคิดกระจัดกระจาย',
  keywords: ['productivity', 'ADHD', 'creators', 'workflow', 'AI'],
  authors: [{ name: 'UnicornX Team' }],
  openGraph: {
    title: 'UnicornX OS',
    description: 'พันธมิตรผู้ร่วมสร้างการเติบโต',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="th">
      <body className={inter.className}>
        <Navigation>
          {children}
        </Navigation>
      </body>
    </html>
  )
}
