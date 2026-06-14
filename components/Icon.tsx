/** Font Awesome (Solid) 아이콘 래퍼 — 디자인 시스템과 동일하게 코랄 단색 */
export default function Icon({
  name,
  className = "",
  style,
}: {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return <i className={`fa-solid fa-${name} ${className}`} style={style} aria-hidden />;
}
