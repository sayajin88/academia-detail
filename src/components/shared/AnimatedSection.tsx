import { useEffect, useRef, useState, ReactNode, useMemo } from 'react';

type AnimationType = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale' | 'blur';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  animation?: AnimationType;
  duration?: 'fast' | 'normal' | 'slow';
  stagger?: number;
  mobileOptimized?: boolean;
}

const getAnimationClasses = (animation: AnimationType, isVisible: boolean): string => {
  const baseTransition = 'transition-all ease-out';
  
  const animations: Record<AnimationType, { hidden: string; visible: string }> = {
    'fade-up': {
      hidden: 'opacity-0 translate-y-6',
      visible: 'opacity-100 translate-y-0'
    },
    'fade-in': {
      hidden: 'opacity-0',
      visible: 'opacity-100'
    },
    'slide-left': {
      hidden: 'opacity-0 -translate-x-8',
      visible: 'opacity-100 translate-x-0'
    },
    'slide-right': {
      hidden: 'opacity-0 translate-x-8',
      visible: 'opacity-100 translate-x-0'
    },
    'scale': {
      hidden: 'opacity-0 scale-95',
      visible: 'opacity-100 scale-100'
    },
    'blur': {
      hidden: 'opacity-0 blur-sm scale-[0.98]',
      visible: 'opacity-100 blur-0 scale-100'
    }
  };

  const state = isVisible ? animations[animation].visible : animations[animation].hidden;
  return `${baseTransition} ${state}`;
};

const getDurationClass = (duration: 'fast' | 'normal' | 'slow', isMobile: boolean): string => {
  const durations = {
    fast: isMobile ? 'duration-300' : 'duration-[400ms]',
    normal: isMobile ? 'duration-[400ms]' : 'duration-[600ms]',
    slow: isMobile ? 'duration-500' : 'duration-700'
  };
  return durations[duration];
};

export function AnimatedSection({ 
  children, 
  delay = 0, 
  className = '',
  animation = 'fade-up',
  duration = 'normal',
  stagger = 0,
  mobileOptimized = true
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    setIsMobile(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const effectiveDelay = mobileOptimized && isMobile ? Math.min(delay, 100) : delay;
          setTimeout(() => setIsVisible(true), effectiveDelay + stagger);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: isMobile ? '0px 0px -20px 0px' : '0px 0px -50px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, stagger, isMobile, mobileOptimized, prefersReducedMotion]);

  const animationClasses = getAnimationClasses(animation, isVisible);
  const durationClass = getDurationClass(duration, mobileOptimized && isMobile);

  return (
    <div
      ref={ref}
      className={`${animationClasses} ${durationClass} ${className}`}
    >
      {children}
    </div>
  );
}

interface StaggeredContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  animation?: AnimationType;
}

export function StaggeredContainer({ 
  children, 
  className = '',
  staggerDelay = 50,
  animation = 'fade-up'
}: StaggeredContainerProps) {
  return (
    <div className={className}>
      {Array.isArray(children) ? children.map((child, index) => (
        <AnimatedSection 
          key={index} 
          stagger={index * staggerDelay}
          animation={animation}
          duration="fast"
        >
          {child}
        </AnimatedSection>
      )) : children}
    </div>
  );
}
