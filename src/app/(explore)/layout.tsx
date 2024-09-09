import ExploreNavigation from "@/components/explore/ExploreNavigation";

export default function ExploreLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-[1920px] mx-auto px-[60px]">
      <section className="flex gap-[50px] h-[calc(100vh-140px)] pt-6 overflow-y-auto">
        <ExploreNavigation />
        {children}
        {/* Include shared UI here e.g. a header or sidebar */}
      </section>
    </div>
  );
}
