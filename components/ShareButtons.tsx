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
      // 如果没有原生分享，跳转到发布推文页面
      const text = encodeURIComponent('💊 Take the Pill. Make them Cope. 🚀\n\n🔥 Trolls getting MASSIVE & MULTIPLYING!\n💊 PUMP LABORATORY: Watch viral spread\n🎭 MBTI MEME GENERATOR: Create your personality\n\nJoin the TROLL REVOLUTION! @troll_pump');
      const link = encodeURIComponent(url);
      const u = `https://x.com/intent/tweet?text=${text}&url=${link}`;
      window.open(u, '_blank', 'noopener,noreferrer');
      success('webshare');
    }
  };

  const x = () => {
    track('share_clicked', { placement: 'hero', platform: 'x' });
    // X 按钮跳转到 @troll_pump 主页
    window.open('https://x.com/troll_pump', '_blank', 'noopener,noreferrer');
    success('x');
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
      <button onClick={copy} className="rounded-xl bg-white px-4 py-2 font-black border-4 border-black shadow-[0_8px_0_#111] active:translate-y-1">Copy</button>
    </div>
  );
}