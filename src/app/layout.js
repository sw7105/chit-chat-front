import { Suspense } from "react";
import "./bulma.min.css";
import "./globals.css";
import { MainContextProvider } from "@/app/mainContext";

export const metadata = {
  title: "Chit-Chat",
  description: "Easy to use chat rooms",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <Suspense>
        <MainContextProvider>
        {children}
        </MainContextProvider>
        </Suspense>
      </body>
    </html>
  );
}
