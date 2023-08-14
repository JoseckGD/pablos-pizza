import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import { UsuarioProvider } from './contexts/UsuarioContext'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Pablo's Pizza",
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UsuarioProvider>
          <ProtectedRoute>
            <Navbar />
            {children}
          </ProtectedRoute>
        </UsuarioProvider>
      </body>
    </html>
  )
}
