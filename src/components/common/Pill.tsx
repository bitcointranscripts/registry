import Link from "next/link";

const Pill = ({ name, slug }: { name: string; slug: string }) => {
  return (
    <Link
      key={name}
      href={slug || ""}
      className="max-content first-letter:capitalize py-1 px-4 rounded-[5px] bg-gray-custom-700 hover:bg-gray-custom-600 hover:text-gray-custom-100 max-md:px-3 max-md:py-[2px] text-xs md:text-sm 2xl:text-base max-md:border max-md:border-gray-custom-300 max-md:leading-[100%]"
    >
      {name}
    </Link>
  );
};

export default Pill;
