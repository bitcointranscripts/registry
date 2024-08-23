import Link from "next/link";
import { allTranscripts } from "contentlayer/generated";
import { getCategories, organizeTags } from "@/utils/fetchCategories";

export default function TagsPage() {
  const categories = getCategories();
  const { tagsByCategory } = organizeTags(allTranscripts, categories);

  const uniqueCategories = Object.keys(tagsByCategory).sort((a, b) =>
    a === "Miscellaneous" ? 1 : b === "Miscellaneous" ? -1 : a.localeCompare(b)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Tags</h1>
      <p className="mb-4">
        {uniqueCategories.length} categories for{" "}
        {Object.values(tagsByCategory).reduce(
          (acc, arr) => acc + arr.length,
          0
        )}{" "}
        unique tags
      </p>

      {uniqueCategories.map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{category}</h2>
          <div className="grid grid-cols-2 gap-4">
            {tagsByCategory[category].map((tag) => {
              const linkHref = `/tags/${tag.slug}`;

              return (
                <Link
                  key={tag.slug}
                  href={linkHref}
                  className="flex justify-between items-center p-2 bg-gray-100 border border-gray-300 rounded"
                >
                  <span>{tag.title}</span>
                  <span>{tag.count}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
