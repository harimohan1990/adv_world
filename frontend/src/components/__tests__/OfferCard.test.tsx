import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import OfferCard from '../OfferCard';
import * as tracking from '../../lib/tracking';

// Mock the tracking module
vi.mock('../../lib/tracking', () => ({
  trackEvent: vi.fn(),
}));

describe('OfferCard', () => {
  const mockOffer = {
    id: '123',
    title: 'Test Offer 50% Off',
    description: 'This is a test description for the offer.',
    offer_value: '50% OFF',
    coupon_code: 'TEST50',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    window.alert = vi.fn();
    
    // Mock IntersectionObserver
    class MockIntersectionObserver {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    }
    window.IntersectionObserver = MockIntersectionObserver as any;
  });

  it('renders the offer details correctly', () => {
    render(<OfferCard offer={mockOffer} />);
    
    expect(screen.getByText('Test Offer 50% Off')).toBeInTheDocument();
    expect(screen.getByText('This is a test description for the offer.')).toBeInTheDocument();
    expect(screen.getByText('50% OFF')).toBeInTheDocument();
    expect(screen.getByText('TEST50')).toBeInTheDocument();
  });

  it('triggers trackEvent with OFFER_CLICK when clicked', () => {
    render(<OfferCard offer={mockOffer} />);
    
    const card = screen.getByText('Test Offer 50% Off').closest('div');
    fireEvent.click(card!);
    
    expect(tracking.trackEvent).toHaveBeenCalledWith(
      'OFFER_CLICK',
      '123'
    );
    expect(window.alert).toHaveBeenCalledWith("Offer Claimed! Tracking event sent.");
  });
});
