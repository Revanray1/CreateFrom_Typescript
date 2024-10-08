import { kanit, playfair_display, sofadi_one } from '@/utils/fonts';
import '../styles/globals.css';
import { StoreProvider } from '@/store/storeProvider';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StoreProvider>
    <html lang="en">
      <body className={ `${kanit} ${playfair_display} ${sofadi_one}`}>{children}</body>
    </html>
    </StoreProvider>
  )
}
