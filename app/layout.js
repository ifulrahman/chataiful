import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import "./prism.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata = {
  title: "Chat AIful - Iful Rahman",
  description: "AI Generated",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <AppContextProvider>
        <html lang="en">
          <body
            className={`${spaceGrotesk.className} antialiased`}
            >
            <Toaster toastOptions={
              {
                success: {style: { background: 'black', color: 'white'}},
                error: {style: { background: 'black', color: 'white'}}
              }
            }/>
            {children}
          </body>
        </html>
      </AppContextProvider>
    </ClerkProvider>
  );
}
