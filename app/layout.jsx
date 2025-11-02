import "@/globals.css"

import SmoothScrollProvider from "./SmoothScrollProvider"

export const metadata = {
  title: "The Art of the Hollywood Memoir",
  icons: {
    icon: "/favicon.ico",
  },
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="theme-color" content="#0A0A0A" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1, viewport-fit=cover"
      />
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  )
}
