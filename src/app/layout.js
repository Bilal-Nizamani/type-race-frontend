import "./globals.css";
import { Inter } from "next/font/google";
import ReduxProvider from "@/redux-store/ReduxProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ReduxProvider> {children}</ReduxProvider>
      </body>
    </html>
  );
}
