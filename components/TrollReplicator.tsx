'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';

interface Troll {
  id: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  delay: number;
  generation: number; // 第几代
}

export function TrollReplicator() {
  const [trolls, setTrolls] = useState<Troll[]>([]);
  const [capsuleCount, setCapsuleCount] = useState(0);
  const [isEating, setIsEating] = useState(false);

  const eatCapsule = useCallback(() => {
    if (isEating) return;
    
    setIsEating(true);
    setCapsuleCount(prev => prev + 1);
    
    // 计算新的 Troll 数量（指数增长）
    const newCount = Math.pow(2, capsuleCount + 1);
    const currentCount = trolls.length;
    const generation = capsuleCount + 1;
    
    // 创建新的 Troll - 每一代都更大
    const newTrolls: Troll[] = [];
    for (let i = currentCount; i < newCount; i++) {
      const baseScale = 1.0 + (generation * 0.3); // 每一代增加30%大小
      newTrolls.push({
        id: `troll-${Date.now()}-${i}`,
        x: Math.random() * 80 + 10, // 10-90%
        y: Math.random() * 80 + 10, // 10-90%
        scale: baseScale + Math.random() * 0.4, // 基础大小 + 随机变化
        rotation: Math.random() * 360,
        delay: Math.random() * 500,
        generation: generation,
      });
    }
    
    setTrolls(prev => [...prev, ...newTrolls]);
    
    // 重置吃胶囊状态
    setTimeout(() => setIsEating(false), 1000);
  }, [trolls.length, capsuleCount, isEating]);

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-2xl border-4 border-black shadow-[0_8px_0_#111] overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 w-8 h-8 bg-black rounded-full"></div>
        <div className="absolute top-8 right-8 w-6 h-6 bg-black rounded-full"></div>
        <div className="absolute bottom-8 left-8 w-4 h-4 bg-black rounded-full"></div>
      </div>

      {/* 胶囊按钮 */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={eatCapsule}
          disabled={isEating}
          className={`
            relative group transition-all duration-300
            ${isEating ? 'scale-90' : 'hover:scale-110 active:scale-95'}
          `}
        >
          <Image 
            src="/images/touming.svg" 
            alt="Pump Pill" 
            width={60} 
            height={60}
            className={`
              transition-all duration-300
              ${isEating ? 'animate-pulse' : 'group-hover:animate-bounce'}
            `}
          />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap">
            {capsuleCount} PILLS
          </div>
        </button>
      </div>

      {/* 计数器 */}
      <div className="absolute top-4 right-4 bg-black text-white px-3 py-2 rounded-lg font-bold text-sm">
        🎯 PUMPED: {trolls.length}
      </div>

      {/* 最大 Troll 显示 */}
      {trolls.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-black text-white px-3 py-2 rounded-lg font-bold text-sm">
          🏆 BIGGEST: {Math.max(...trolls.map(t => t.scale)).toFixed(1)}x
        </div>
      )}

      {/* Troll 容器 */}
      <div className="relative w-full h-full">
        {trolls.map((troll) => (
          <div
            key={troll.id}
            className="absolute animate-pop-in"
            style={{
              left: `${troll.x}%`,
              top: `${troll.y}%`,
              transform: `scale(${troll.scale}) rotate(${troll.rotation}deg)`,
              animationDelay: `${troll.delay}ms`,
            }}
          >
            <Image 
              src="/images/trolltouming.png" 
              alt="Pumped Troll" 
              width={50} 
              height={50}
              className="sticker animate-jitter"
            />
            {/* 显示代数标签 */}
            {troll.generation > 1 && (
              <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1 rounded-full">
                G{troll.generation}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 提示文字 */}
      {trolls.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-black mb-2">💊 CLICK TO PUMP</div>
            <div className="text-sm text-gray-600">Watch trolls get MASSIVE & MULTIPLY</div>
            <div className="text-xs text-gray-500 mt-1">1 → 2 → 4 → 8 → 16...</div>
          </div>
        </div>
      )}

      {/* 裂变效果提示 */}
      {isEating && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-4xl font-bold text-black animate-pulse mb-2">
              💊 PUMPING...
            </div>
            <div className="text-lg text-black animate-bounce">
              GETTING MASSIVE!
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 