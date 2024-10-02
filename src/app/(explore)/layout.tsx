import ExploreNavigation from "@/components/explore/ExploreNavigation";

export default function ExploreLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 lg:px-10 2xl:px-[60px]">
      <section className="flex  gap-[50px] h-[calc(100vh-var(--header-height))]  pt-6 overflow-y-auto ">
        <ExploreNavigation />
        <div className="max-h-full h-full w-full scroll-smooth overflow-scroll ">{children}</div>

        {/* Include shared UI here e.g. a header or sidebar */}
      </section>
    </div>
  );
}
