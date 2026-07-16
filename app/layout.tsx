import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Monterey Minivan Campers — Explore More. Sleep Anywhere.',
  description:
    'The most affordable camper rental on California\'s Central Coast. Explore Monterey, Carmel, and Big Sur in a Toyota Sienna camper minivan from $59/night.',
  openGraph: {
    title: 'Monterey Minivan Campers',
    description:
      'Affordable Toyota Sienna camper rentals for Monterey, Carmel, and Big Sur. From $59/night.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Nunito+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
