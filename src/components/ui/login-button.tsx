import React from 'react';
import { cn } from '@/lib/utils';

interface LoginButtonProps {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const LoginButton = ({ onClick, className, children }: LoginButtonProps) => {
  return (
    <div
      aria-label="User Login Button"
      tabIndex={0}
      role="button"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
      className={cn(
        "w-[131px] h-[51px] rounded-[15px] cursor-pointer transition-all duration-300",
        "bg-gradient-to-br from-primary to-primary/0 bg-primary/20",
        "hover:bg-primary/70 focus:bg-primary/70",
        "hover:shadow-[0_0_10px_hsl(var(--primary)/0.5)] focus:shadow-[0_0_10px_hsl(var(--primary)/0.5)]",
        "focus:outline-none",
        "flex items-center justify-center",
        className
      )}
    >
      <div className={cn(
        "w-[127px] h-[47px] rounded-[13px]",
        "bg-background dark:bg-[#1a1a1a]",
        "flex items-center justify-center gap-3",
        "text-foreground font-semibold",
        "border border-border/50"
      )}>
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-6 h-6 fill-current"
        >
          <g data-name="Layer 2" id="Layer_2">
            <path d="m15.626 11.769a6 6 0 1 0 -7.252 0 9.008 9.008 0 0 0 -5.374 8.231 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 9.008 9.008 0 0 0 -5.374-8.231zm-7.626-4.769a4 4 0 1 1 4 4 4 4 0 0 1 -4-4zm10 14h-12a1 1 0 0 1 -1-1 7 7 0 0 1 14 0 1 1 0 0 1 -1 1z" />
          </g>
        </svg>
        <span>{children || 'Log In'}</span>
      </div>
    </div>
  );
};

export default LoginButton;
