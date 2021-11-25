import * as React from "react";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";

import generateImageUrl from "../utils/image-urls";

type ImageGalleryProps = {
  metadata: {
    images: string[];
    category: string;
  };
};

type ImagePortalProps = {
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
  imageUrl: string;
  imageAlt: string;
  hasMultipleImages: boolean;
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 2;
`;

const InnerWrapper = styled.div`
  max-width: 92vw;
  max-height: 92vh;
  position: relative;
  min-width: 30vw;
  min-height: 30vh;
  background-color: var(--gray-500);
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const loadingAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoadingIndicator = styled.svg`
  color: white;
  animation: ${loadingAnimation} linear 2s infinite;
`;

const Image = styled.img`
  max-width: 92vw;
  max-height: 92vh;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
`;

const Button = styled.button`
  background-color: var(--yellow);
  color: var(--gray-500);
  border: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  transition: color 0.1s linear, background-color 0.1s linear;
  position: absolute;

  &:hover,
  &:focus-visible {
    background-color: var(--gray-500);
    color: white;
  }
`;

const Gallery = styled.figure`
  --columns: 3;
  --gap: 1.5rem;
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: var(--gap);
  margin-top: 3rem;

  @media (max-width: 1000px) {
    --gap: 1rem;
  }

  @media (min-width: 800px) and (max-width: 1000px) {
    --columns: 2;
  }

  @media (max-width: 600px) {
    --columns: 2;
  }
`;

const GalleryImage = styled.img`
  object-fit: cover;
  aspect-ratio: 16/9;
  transition: opacity 0.1s linear;
`;

const GalleryImageLink = styled.a`
  background-color: var(--yellow);

  &:hover > img,
  &:focus-visible > img {
    opacity: 0.4;
  }
`;

function LightboxPortal({
  onNext,
  onPrevious,
  onClose,
  imageUrl,
  imageAlt,
  hasMultipleImages,
}: ImagePortalProps) {
  const lightboxRef = React.useRef<HTMLDivElement>(null);
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);

  React.useEffect(() => {
    const focusable = lightboxRef.current?.querySelectorAll("button") || [];
    focusable[0].focus();

    function handleKeyDown(evt: KeyboardEvent) {
      if (evt.key === "Tab") {
        if (
          !evt.shiftKey &&
          document.activeElement === focusable[focusable.length - 1]
        ) {
          evt.preventDefault();
          focusable[0].focus();
        } else if (evt.shiftKey && document.activeElement === focusable[0]) {
          evt.preventDefault();
          focusable[focusable.length - 1].focus();
        }
      } else if (evt.key === "Escape") {
        onClose();
      } else if (evt.key === "ArrowRight" && hasMultipleImages) {
        onNext();
      } else if (evt.key === "ArrowLeft" && hasMultipleImages) {
        onPrevious();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return createPortal(
    <Wrapper ref={lightboxRef}>
      <InnerWrapper>
        <Button
          type="button"
          title="Bild schließen"
          onClick={onClose}
          css={`
            right: 0;
            top: 0;
            border-radius: 2px;
          `}
        >
          <svg width={28} height={28}>
            <use xlinkHref="/symbol-defs.svg#close" />
          </svg>
        </Button>
        {hasMultipleImages && (
          <>
            <Button
              type="button"
              title="Vorheriges Bild anzeigen"
              onClick={onPrevious}
              css={`
                height: 100px;
                border-radius: 0 2px 2px 0;
                top: calc(50% - 50px);
                left: 0;
              `}
            >
              <svg width={28} height={28}>
                <use xlinkHref="/symbol-defs.svg#previous" />
              </svg>
            </Button>
            <Button
              type="button"
              title="Nächstes Bild anzeigen"
              onClick={onNext}
              css={`
                height: 100px;
                border-radius: 2px 0 0 2px;
                top: calc(50% - 50px);
                right: 0;
              `}
            >
              <svg width={28} height={28}>
                <use xlinkHref="/symbol-defs.svg#next" />
              </svg>
            </Button>
          </>
        )}

        {!isImageLoaded && (
          <LoadingIndicator
            aria-label="Bild wird geladen..."
            width={35}
            height={35}
          >
            <use xlinkHref="/symbol-defs.svg#spinner" />
          </LoadingIndicator>
        )}
        <Image
          src={imageUrl}
          alt={imageAlt}
          onLoad={() => setIsImageLoaded(true)}
          onProgress={() => setIsImageLoaded(false)}
        />
      </InnerWrapper>
    </Wrapper>,
    document.getElementById("___gatsby")!
  );
}

function ImageGallery({ metadata }: ImageGalleryProps) {
  const [index, setIndex] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);

  function handleSetNext() {
    if (index === metadata.images.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  function handleSetPrevious() {
    if (index === 0) {
      setIndex(metadata.images.length - 1);
    } else {
      setIndex(index - 1);
    }
  }

  return (
    <>
      {isVisible && (
        <LightboxPortal
          onNext={handleSetNext}
          onPrevious={handleSetPrevious}
          onClose={() => setIsVisible(false)}
          hasMultipleImages={metadata.images.length > 1}
          imageUrl={generateImageUrl(metadata.images[index], metadata.category)}
          imageAlt={`Bild ${index + 1} von ${metadata.images.length}`}
        />
      )}
      <Gallery>
        {metadata.images.map((image, index) => (
          <GalleryImageLink
            href={generateImageUrl(image, metadata.category)}
            key={image}
            onClick={(evt) => {
              evt.preventDefault();
              setIndex(index);
              setIsVisible(true);
            }}
          >
            <GalleryImage
              src={generateImageUrl(image, metadata.category, 300)}
              alt=""
              loading="lazy"
              width={300}
              height={180}
            />
          </GalleryImageLink>
        ))}
      </Gallery>
    </>
  );
}

export default ImageGallery;
