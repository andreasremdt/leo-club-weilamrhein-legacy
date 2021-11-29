import * as React from "react";
import styled from "styled-components";

type Props = {
  category: string;
  name: string;
  alt?: string;
  width?: number;
  height?: number;
  lazy?: boolean;
  objectFit?: string;
};

const Picture = styled.picture`
  background-color: var(--gray-500);
  display: block;
  border-radius: 2px;
`;

const Image = styled.img<{ objectFit: string }>`
  transition: opacity 0.1s linear;
  display: block;
  opacity: 0;
  object-fit: ${({ objectFit }) => objectFit};
  border-radius: 2px;

  &[src] {
    opacity: 1;
  }
`;

function CloudinaryImage({
  category,
  name,
  width,
  height,
  objectFit = "none",
  lazy = true,
  alt = "",
  ...props
}: Props) {
  const pictureRef = React.useRef<HTMLPictureElement>(null);

  const h = height ? `h_${height},` : "";
  const w = width ? `w_${width},` : "";
  const baseUrl = `https://res.cloudinary.com/leoclub/image/upload/c_fill,g_center,${h}${w}q_50`;
  const [basename] = name.split(/\./g);

  React.useEffect(() => {
    const observer = new IntersectionObserver(function (entries) {
      const [image] = entries;

      if (image.isIntersecting) {
        const [source, img] = Array.from(image.target.children);

        if (source.hasAttribute("data-srcset")) {
          source.setAttribute("srcset", source.getAttribute("data-srcset")!);
          source.removeAttribute("data-srcset");
        }

        if (img.hasAttribute("data-src")) {
          img.setAttribute("src", img.getAttribute("data-src")!);
          img.removeAttribute("data-src");
        }
      }
    });

    if (pictureRef.current && lazy) {
      observer.observe(pictureRef.current);
    }

    return () => {
      if (pictureRef.current && lazy) {
        observer.unobserve(pictureRef.current);
      }
    };
  }, [pictureRef, lazy]);

  return (
    <Picture ref={pictureRef}>
      <source
        type="image/webp"
        data-srcset={`${baseUrl}/${category}/${basename}.webp`}
        srcSet={lazy ? undefined : `${baseUrl}/${category}/${basename}.webp`}
      />
      <Image
        data-src={`${baseUrl}/${category}/${basename}.jpg`}
        src={lazy ? undefined : `${baseUrl}/${category}/${basename}.jpg`}
        alt={alt}
        width={width}
        height={height}
        objectFit={objectFit}
        {...props}
      />
      <noscript>
        <img
          src={`${baseUrl}/${category}/${basename}.jpg`}
          alt={alt}
          width={width}
          height={height}
          {...props}
        />
      </noscript>
    </Picture>
  );
}

export default CloudinaryImage;
