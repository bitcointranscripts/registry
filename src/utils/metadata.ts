import { Metadata } from "next";
import { previewImageDimensions } from "./data";

type BuildMetadataProps = {
  alternateLanguages: string[];
  metadataLanguages: Record<string, string>;
  language: string;
  canonical?: string;
  generateOpenGraphImage?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
} & Partial<Metadata>;

export const buildMetadata = ({
  alternateLanguages,
  metadataLanguages,
  language,
  generateOpenGraphImage,
  canonical = "/",
  ...metadata
}: BuildMetadataProps): Metadata => {
  const metadataObject: Metadata = {
    ...metadata,
    alternates: {
      canonical,
      languages: metadataLanguages, // Add custom metadata for languages
    },
    other: {
      alternateLanguages,
      language,
    },
  };

  if (generateOpenGraphImage) {
    metadataObject.openGraph = {
      images: [
        {
          url: generateOpenGraphImage.url,
          width: generateOpenGraphImage.width ?? previewImageDimensions.width,
          height: generateOpenGraphImage.height ?? previewImageDimensions.height,
          alt: generateOpenGraphImage.alt,
        },
      ],
    };
    metadataObject.twitter = {
      images: [
        {
          url: generateOpenGraphImage.url,
          width: generateOpenGraphImage.width ?? previewImageDimensions.width,
          height: generateOpenGraphImage.height ?? previewImageDimensions.height,
          alt: generateOpenGraphImage.alt,
        },
      ],
      card: 'summary_large_image',
      creator: '@bitcoin_devs'
    };
  }

  return metadataObject;
};
