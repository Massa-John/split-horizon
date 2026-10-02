import './globals.css';

export const metadata = {
  title: 'Blue Chat',
  description: 'Modern cartoon-style chat frontend',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
