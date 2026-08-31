import './globals.css';
import { StoreProvider } from '../context/StoreContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Notification from '../components/Notification';

export const metadata = {
  title: 'Cloth Store | Minimalist Apparel',
  description: 'Curated technical and fashion apparel collection.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Notification />
        </StoreProvider>
      </body>
    </html>
  );
}