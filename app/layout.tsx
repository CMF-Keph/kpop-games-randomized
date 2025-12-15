import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import PopupProvider from "./provider/PopupProvider";
import Popup from "./shared/Popup";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "K-Pop Games Randomized!",
  description: "Play all kind of K-Pop games randomly generated for you!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} data-lt-installed="true">
      <body
        className={`${montserrat.className} antialiased min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-blue-50 p-4`}
      >
        <PopupProvider>
          <Popup></Popup>
          <main 
            className="max-w-6xl mx-auto"
          >
            {children}
          </main>        
        </PopupProvider>
      </body>
    </html>
  );
}
