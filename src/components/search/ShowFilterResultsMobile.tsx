import { ArbitraryCallback } from "@/app/search/types";
import { useSearch } from "@/app/search/useSearch";

const ShowFilterResultsMobile = ({callback} :{callback: ArbitraryCallback}) => {
  const { totalResults } = useSearch().pagingInfo;
  return (
    <div
      className="my-8 ml-auto md:hidden w-fit p-2 text-sm font-semibold text-custom-white bg-custom-primary-text rounded-lg"
      role="button"
      onClick={callback}
    >
      {`Show ${totalResults} results`}
    </div>
  );
};

export default ShowFilterResultsMobile;