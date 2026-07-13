interface BadgeProps {
  text: string;
  variant?: "category" | "price" | "free";
}

export default function Badge({ text, variant = "category" }: BadgeProps) {
  const styles = {
    category: "bg-violet-100 text-violet-700",
    price: "bg-slate-100 text-slate-700",
    free: "bg-green-100 text-green-700",
  };

  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles[variant]}`}>
      {text}
    </span>
  );
}