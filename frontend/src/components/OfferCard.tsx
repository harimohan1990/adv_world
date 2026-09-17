import { Tag, Clock } from 'lucide-react';

interface OfferProps {
  offer: {
    id: string;
    title: string;
    description: string;
    discount_value: number;
    discount_type: string;
    promo_code?: string;
  };
}

export default function OfferCard({ offer }: OfferProps) {
  return (
    <div className="glass p-6 rounded-2xl hover:bg-white/[0.02] transition-colors border border-dark-border hover:border-brand-purple/50 group">
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
            {offer.discount_type === 'percentage' ? `${offer.discount_value}%` : `$${offer.discount_value}`}
          </p>
        </div>
        {offer.promo_code && (
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">Promo Code</p>
            <p className="font-mono text-brand-pink font-semibold bg-brand-pink/10 px-3 py-1 rounded-lg">
              {offer.promo_code}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
