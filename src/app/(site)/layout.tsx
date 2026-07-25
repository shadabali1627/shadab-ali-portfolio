import "@/styles/globals.css";
import { inter, jetBrainsMono } from "@/lib/fonts";
import { ChatWidget } from "@/components/ui/chat-widget";

export const metadata = {
  title: 'AI Engineer Portfolio',
  description: 'Building frontier technologies and intelligent systems.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) { 
  return (
    <html lang="en" className={`${inter.variable} ${jetBrainsMono.variable}`}>
      <body className="bg-bg-page text-text-primary antialiased">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
