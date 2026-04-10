import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm",
        hover && "transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05]",
        className
      )}
    >
      {children}
    </div>
  );
}
