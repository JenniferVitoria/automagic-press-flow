import apLogo from "@/assets/ap-logo.png";

interface APLogoProps {
  size?: "sm" | "default" | "lg";
}

const APLogo = ({ size = "default" }: APLogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    default: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <img
      src={apLogo}
      alt="AutomaticPress Logo"
      className={`${sizeClasses[size]} rounded-xl transition-transform hover:scale-105`}
    />
  );
};

export default APLogo;
