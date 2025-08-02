"use client";

import { useEffect } from 'react';
import { Card } from './ui/card';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdBanner = ({ className }: { className?: string }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  if (!process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID) {
    return (
        <div className="my-8 text-center">
            <Card className="flex items-center justify-center bg-muted/30 h-48">
                <p className="text-muted-foreground">Ad Placeholder</p>
            </Card>
        </div>
    );
  }

  return (
    <div className={`my-8 text-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}
        // data-ad-slot="YOUR_AD_SLOT_ID" - Note: Slot ID is optional for Auto Ads
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};
