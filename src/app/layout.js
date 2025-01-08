import "./bulma.min.css";
import "./globals.css";

export const metadata = {
  title: "Chit-Chat",
  description: "Easy to use chat rooms",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
