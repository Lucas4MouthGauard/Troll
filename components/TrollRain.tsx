'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface FallingTroll {
  id: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  speed: number;
  delay: number;
}

interface TrollRainProps {
  isActive: boolean;
  onComplete: () => void;
}

export function TrollRain({ isActive, onComplete }: TrollRainProps) {
  const [trolls, setTrolls] = useState<FallingTroll[]>([]);

  useEffect(() => {
    if (!isActive) {
      setTrolls([]);
      return;
    }

    // 创建掉落的 Troll
    const newTrolls: FallingTroll[] = [];
    const trollCount = 50; // 掉落50个 Troll

    for (let i = 0; i < trollCount; i++) {
      newTrolls.push({
        id: `rain-troll-${Date.now()}-${i}`,
        x: Math.random() * 100, // 0-100% 水平位置
        y: -20 - Math.random() * 50, // 从屏幕上方开始
        rotation: Math.random() * 720 - 360, // -360 到 360 度旋转
        scale: 0.5 + Math.random() * 1.5, // 0.5 到 2.0 倍大小
        speed: 2 + Math.random() * 4, // 2-6 的掉落速度
        delay: Math.random() * 2000, // 0-2秒的延迟
      });
    }

    setTrolls(newTrolls);

    // 3秒后完成动画
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {trolls.map((troll) => (
        <div
          key={troll.id}
          className="absolute troll-fall"
          style={{
            left: `${troll.x}%`,
            top: `${troll.y}%`,
            transform: `scale(${troll.scale})`,
            animationDelay: `${troll.delay}ms`,
            animationDuration: `${troll.speed}s`,
            animationIterationCount: 'infinite',
          }}
        >
          <Image 
            src="/images/trolltouming.png" 
            alt="Falling Troll" 
            width={60} 
            height={60}
            className="sticker"
          />
        </div>
      ))}
      
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black bg-opacity-20" />
      
      {/* 中心提示 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="text-6xl font-bold text-white animate-pulse mb-4">
            💊 DOSE ×2 ACTIVATED!
          </div>
          <div className="text-2xl text-white animate-bounce">
            TROLLS RAINING FROM THE SKY!
          </div>
        </div>
      </div>
    </div>
  );
} 