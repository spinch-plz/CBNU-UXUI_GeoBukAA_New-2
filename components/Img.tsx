const B = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Img({ src, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  const resolved = typeof src === "string" && src.startsWith("/") ? `${B}${src}` : src;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={resolved as string} {...props} alt={props.alt ?? ""} />;
}
