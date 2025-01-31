import {
  constructSlugPaths,
  createContentSlug,
  deriveSourcesList,
  loadManropeFont,
  unsluggify,
} from "@/utils";
import { ImageResponse } from "next/og";
import allSources from "@/public/sources-data.json";
import SourcesPreview from "@/components/metadata/SourcesPreview";
import HomePreview from "@/components/metadata/HomePreview";
import { previewImageDimensions } from "@/utils/data";

export const runtime = "edge"; // Ensure this API runs in Edge Runtime

export async function GET(
  request: Request,
  { params }: { params: { slug?: string[] } },
) {
  const baseUrl = `${request.headers.get("x-forwarded-proto")}://${request.headers.get("x-forwarded-host")}`;
  // Get local font
  const { regularFontData, boldFontData } = await loadManropeFont(baseUrl);
  // Extract the slug dynamically
  const slug = params.slug ? params.slug : [];
  const { slugPaths } = constructSlugPaths(slug);
  let foundSource: any = allSources;

  // find the source tree for source (accounts for languages and nested sources)
  for (const part of slugPaths) {
    if (typeof foundSource === "object" && !Array.isArray(foundSource) && part in foundSource) {
      foundSource = foundSource[part];
    } else {
      foundSource = null;
    }
  }
  
  // find the source data
  const sourceData = foundSource ? deriveSourcesList({"need-key-to-compute": foundSource})?.[0] : null;

  if (!sourceData) {
     return new ImageResponse(<HomePreview />, {
      width: previewImageDimensions.width,
      height: previewImageDimensions.height,
      fonts: [
        {
          name: "Manrope",
          data: boldFontData,
          style: "normal",
          weight: 700,
        },
        {
          name: "Manrope",
          data: regularFontData,
          style: "normal",
          weight: 500,
        },
      ],
    })
  }

  // Return the OG image
  return new ImageResponse(
    <SourcesPreview name={sourceData.name} count={sourceData.count} />,
    {
      width: previewImageDimensions.width,
      height: previewImageDimensions.height,
      fonts: [
        {
          name: "Manrope",
          data: boldFontData,
          style: "normal",
          weight: 700,
        },
        {
          name: "Manrope",
          data: regularFontData,
          style: "normal",
          weight: 500,
        },
      ],
    },
  );
}
