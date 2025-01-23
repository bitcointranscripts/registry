import {
  constructSlugPaths,
  createContentSlug,
  loadManropeFont,
  unsluggify,
} from "@/utils";
import { ImageResponse } from "next/og";
import allSources from "@/public/source-count-data.json";
import SourcesPreview from "@/components/metadata/SourcesPreview";
import HomePreview from "@/components/metadata/HomePreview";

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
  const languageSlug = constructSlugPaths(slug);
  const sourceRouteName = unsluggify(languageSlug.slugPaths[0]);

  // find the route name in the source data
  const foundSources = allSources.find(
    (source) => source.slug === createContentSlug(sourceRouteName),
  );

  if (!foundSources) {
     return new ImageResponse(<HomePreview />, {
      width: 1280,
      height: 720,
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
    <SourcesPreview name={foundSources.name} count={foundSources.count} />,
    {
      width: 1200,
      height: 630,
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
