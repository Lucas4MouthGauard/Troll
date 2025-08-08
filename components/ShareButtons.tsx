"use client";
import { track } from '@/lib/analytics';
import { siteUrl } from '@/lib/config';

export function ShareButtons({ onSuccess }: { onSuccess: () => void }) {
  const url = typeof window !== 'undefined' ? window.location.href : siteUrl;

  const success = (platform: 'x' | 'tg' | 'copy' | 'webshare') => {
    track('share_success', { platform, boost: 2, ttl: 30 });
    onSuccess();
  };

  const shareNative = async () => {
    track('share_clicked', { placement: 'hero', platform: 'webshare' });
    if (navigator.share) {
      try {
        await navigator.share({ title: 'troll', text: 'Take the pill. Make them cope.', url });
        success('webshare');
      } catch {}
    } else {
      await copy();
    }
  };

  const x = () => {
    track('share_clicked', { placement: 'hero', platform: 'x' });
    const text = encodeURIComponent('Take the Pill. Make them Cope.');
    const link = encodeURIComponent(url);
    const u = `https://twitter.com/intent/tweet?text=${text}&url=${link}`;
    window.open(u, '_blank', 'noopener,noreferrer');
    success('x');
  };

  const tg = () => {
    track('share_clicked', { placement: 'hero', platform: 'tg' });
    const text = encodeURIComponent('Take the Pill. Make them Cope.');
    const link = encodeURIComponent(url);
    const u = `https://t.me/share/url?url=${link}&text=${text}`;
    window.open(u, '_blank', 'noopener,noreferrer');
    success('tg');
  };

  const copy = async () => {
    track('share_clicked', { placement: 'hero', platform: 'copy' });
    try {
      await navigator.clipboard.writeText(url);
      success('copy');
    } catch {}
  };

  return (
    <div className="flex items-center gap-3">
      <button onClick={shareNative} className="rounded-xl bg-white px-4 py-2 font-black border-4 border-black shadow-[0_8px_0_#111] active:translate-y-1">Share</button>
      <button onClick={x} className="rounded-xl bg-white px-4 py-2 font-black border-4 border-black shadow-[0_8px_0_#111] active:translate-y-1">X</button>
      <button onClick={tg} className="rounded-xl bg-white px-4 py-2 font-black border-4 border-black shadow-[0_8px_0_#111] active:translate-y-1">TG</button>
      <button onClick={copy} className="rounded-xl bg-white px-4 py-2 font-black border-4 border-black shadow-[0_8px_0_#111] active:translate-y-1">Copy</button>
    </div>
  );
}