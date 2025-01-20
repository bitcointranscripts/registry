import { FacetKeys } from "@/app/search/types";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type ButtonPillProp = {
  kind: "button"
  name: string;
  value: string;
  isSelected?: boolean;
  type: FacetKeys;
  toggleFilter: ({ filterType, filterValue }: { filterType: FacetKeys; filterValue: string }) => void;
  onClick?: (e: React.MouseEvent) => void
}

type LinkPillProp = {
  kind: "link"
  name: string;
  slug: string;
  isSelected?: boolean;
  onClick?: (e: React.MouseEvent) => void
}

type PillProps = ButtonPillProp | LinkPillProp;

const Pill = (props: PillProps) => {
  return (
    <PillActionContainer {...props}>
      {props.name}
    </PillActionContainer>
  );
};

const PillActionContainer = (props: React.PropsWithChildren<PillProps>) => {
  const selectedPillClass = `data-[selected=true]:bg-orange-custom-100 data-[selected=true]:text-gray-custom-100 dark:data-[selected=true]:bg-orange-custom-100 dark:data-[selected=true]:text-black`
  const animationClass = `transition-all duration-300 `
  const prop = {
    "data-selected": Boolean(props.isSelected),
    className: twMerge(selectedPillClass, animationClass,
      "max-content py-[4px] px-[6px] md:px-4 rounded-[5px] bg-gray-custom-700 hover:bg-gray-custom-600 hover:text-gray-custom-100 dark:bg-gray-custom-2100 dark:hover:bg-gray-custom-1800 dark:hover:text-black max-md:leading-[100%] cursor-pointer"),
  };

  const defaultOnClick = (e: React.MouseEvent) => {e.stopPropagation()}
  if (props.kind === "button") {
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      defaultOnClick(e);
      props.onClick
      ? props.onClick(e)
      : props.toggleFilter({ filterType: props.type, filterValue: props.value });
    }
    return (
      <button {...prop} onClick={handleClick}>
        {props.children}
      </button>
    )
  }

  return (
    <Link href={props.slug || ""} {...prop} onClick={defaultOnClick} prefetch={false}>
      {props.children}
    </Link>
  );
};

export default Pill;
