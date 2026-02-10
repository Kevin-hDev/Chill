interface StepImageProps {
  src: string;
  alt: string;
  caption?: string;
  maxWidth?: string;
  width?: number;
  height?: number;
}

export default function StepImage({ src, alt, caption, maxWidth, width = 700, height = 400 }: StepImageProps) {
  return (
    <figure className="my-4" style={maxWidth ? { maxWidth } : { maxWidth: '70%' }}>
      <div className="border border-chill-border rounded-chill overflow-hidden">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-micro text-chill-text-muted italic text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
