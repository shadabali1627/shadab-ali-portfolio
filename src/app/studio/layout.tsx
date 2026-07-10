export const metadata = {
  title: 'Sanity Studio',
  description: 'Backend content management system',
  icons: {
    icon: [
      { url: '/studio/studio-icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/studio/studio-icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/studio/studio-icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
