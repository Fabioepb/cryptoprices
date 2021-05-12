import MarketTable from '../Components/market/MarketTable';
import TopBar from '../Components/common/TopBar';
import Banner from '../Components/market/MarketHeader';
import Footer from '../Components/Footer';
import Head from 'next/head';
import NavBar from '../Components/common/NavBar';

export default function index() {
  return (
    <div className='bg-gray-100 dark:bg-indigo-background font-sans'>
      <Head>
        <title>BlockExplorer.com | Market</title>
        <link rel='icon' href='/favicon.ico' type='image/x-icon' />
      </Head>
      <div>
        <TopBar />
        <NavBar />
        <section className='container mx-auto'>
          <Banner />
          <MarketTable />
        </section>
        <Footer />
      </div>
    </div>
  );
}
