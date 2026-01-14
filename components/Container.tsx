import { ReactNode } from "react";

const sizeMap = {
  default: "max-w-[1280px]",
  hero: "max-w-[1400px]"
};

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: keyof typeof sizeMap;
};

export default function Container({ children, className = "", size = "default" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full px-6 sm:px-10 lg:px-16 ${sizeMap[size]} ${className}`}>
      {children}
    </div>
  );
}
