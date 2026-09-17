import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import OfferCard from '../components/OfferCard';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await api.get('/campaigns/trending-offers');
        setOffers(response.data);
      } catch (error) {
        console.error('Failed to fetch offers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      <section id="trending" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-dark-border">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-3 bg-brand-pink/10 rounded-xl">
            <Sparkles className="w-6 h-6 text-brand-pink" />
          </div>
          <h2 className="text-3xl font-bold">Trending Offers</h2>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass p-6 rounded-2xl h-48 animate-pulse border-dark-border" />
            ))}
          </div>
        ) : offers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer: any) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass rounded-2xl border-dark-border">
            <p className="text-gray-400">No trending offers available right now. Check back soon!</p>
          </div>
        )}
      </section>
    </div>
  );
}
