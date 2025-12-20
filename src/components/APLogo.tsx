interface APLogoProps {
  size?: "sm" | "default" | "lg";
}

const APLogo = ({ size = "default" }: APLogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    default: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  return (
    <div
      className={`${sizeClasses[size]} bg-gradient-to-br from-primary via-primary to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary/25 transition-transform hover:scale-105`}
    >
      <span className="text-primary-foreground font-black tracking-tight">AP</span>
    </div>
  );
};

export default APLogo;
