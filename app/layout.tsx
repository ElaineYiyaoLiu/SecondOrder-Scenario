import type { Metadata } from 'next';
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/manrope';
import './style.css';

export const metadata: Metadata = {
  title: 'SecondOrder Scenario',
  description: 'Interactive scenario analysis for exploring second-order effects across technology, labor, demand, and distribution.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
