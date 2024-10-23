import ExploreNavigation from "@/components/explore/ExploreNavigation";
import FooterComponent from "@/components/layout/FooterComponent";
import Wrapper from "@/components/layout/Wrapper";

export default function ExploreLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="mt-2 md:mt-6 h-[calc(100vh-var(--header-height)-26px)] overflow-y-auto">
        <Wrapper className="flex gap-[50px] md:pb-[100px]">
          <ExploreNavigation />
          <div className="w-full scroll-smooth">{children}</div>

          {/* Include shared UI here e.g. a header or sidebar */}
        </Wrapper>
        <FooterComponent />
      </section>
    </>
  );
}
