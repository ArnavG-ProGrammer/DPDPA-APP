import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  color?: string;
}

interface BreadcrumbTrailProps {
  items: BreadcrumbItem[];
}

const itemStyle: React.CSSProperties = {
  fontSize: 12,
  fontFamily: "var(--font-ibm), sans-serif",
  color: "#4B5563",
  textDecoration: "none",
  whiteSpace: "nowrap",
};

export function BreadcrumbTrail({ items }: BreadcrumbTrailProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, overflowX: "auto" }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {i > 0 && (
            <span style={{ color: "#4B5563", fontSize: 12 }}>›</span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              style={{
                ...itemStyle,
                color: item.color ?? "#4B5563",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "#F0EAD6";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = item.color ?? "#4B5563";
              }}
            >
              {item.label}
            </Link>
          ) : (
            <span style={{ ...itemStyle, color: item.color ?? "#94A3B8" }}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
