import { api } from './api';

// Generate a random session ID if one doesn't exist
const getSessionId = () => {
  let sessionId = localStorage.getItem('adv_session_id');
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('adv_session_id', sessionId);
  }
  return sessionId;
};

export const trackEvent = async (
  eventType: 'OFFER_IMPRESSION' | 'OFFER_CLICK' | 'PAGE_VIEW',
  offerId?: string,
  metadata?: Record<string, any>
) => {
  const sessionId = getSessionId();
  
  try {
    // Fire and forget tracking request
    api.post('/analytics/track', {
      session_id: sessionId,
      event_type: eventType,
      offer_id: offerId,
      metadata_: {
        url: window.location.href,
        userAgent: navigator.userAgent,
        ...metadata
      }
    });
  } catch (error) {
    // Silently fail to avoid disrupting user experience
    console.error('Tracking error', error);
  }
};
