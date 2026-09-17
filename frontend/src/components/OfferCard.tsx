import { Tag, Clock } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { trackEvent } from '../lib/tracking';

interface OfferProps {
  offer: {
    id: string;
    title: string;
    description: string;
    offer_value: string;
    coupon_code?: string;
  };
}

export default function OfferCard({ offer }: OfferProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple intersection observer to track when offer comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          trackEvent('OFFER_IMPRESSION', offer.id);
          observer.disconnect(); // Only track impression once per mount
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [offer.id]);

  const handleClaim = () => {
    trackEvent('OFFER_CLICK', offer.id);
    // Add logic here to show coupon or redirect
    alert("Offer Claimed! Tracking event sent.");
  };

  return (
    <div 
      ref={cardRef}
      className="glass p-6 rounded-2xl hover:bg-white/[0.02] transition-colors border border-dark-border hover:border-brand-purple/50 group cursor-pointer"
      onClick={handleClaim}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-brand-purple/10 rounded-xl text-brand-purple group-hover:scale-110 transition-transform">
          <Tag className="w-6 h-6" />
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 text-gray-300">
          <Clock className="w-3 h-3" /> Active
        </span>
      </div>
      
      <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
      <p className="text-gray-400 text-sm mb-6 line-clamp-2">{offer.description}</p>
      
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div>
          <p className="text-xs text-gray-500 mb-1">Discount</p>
          <p className="text-2xl font-bold text-white">
            {offer.offer_value}
          </p>
        </div>
        {offer.coupon_code && (
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">Promo Code</p>
            <p className="font-mono text-brand-pink font-semibold bg-brand-pink/10 px-3 py-1 rounded-lg">
              {offer.coupon_code}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
