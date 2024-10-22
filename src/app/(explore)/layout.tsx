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
      <Wrapper>
        <section className="flex gap-[50px] md:pb-[100px] pt-2 md:pt-6">
          <ExploreNavigation />
          <div className="w-full scroll-smooth">{children}</div>

          {/* Include shared UI here e.g. a header or sidebar */}
        </section>
      </Wrapper>
      <FooterComponent />
    </>
  );
}
