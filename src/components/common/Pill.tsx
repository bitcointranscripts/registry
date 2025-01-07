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
  const selectedPillClass = `data-[selected=true]:bg-orange-custom-100 data-[selected=true]:text-gray-custom-100`
  const animationClass = `transition-all duration-300 active:scale-90`
  const prop = {
    "data-selected": Boolean(props.isSelected),
    className: twMerge(selectedPillClass, animationClass, "max-content py-1 px-4 rounded-[5px] bg-gray-custom-700 hover:bg-gray-custom-600 hover:text-gray-custom-100 max-md:px-3 max-md:py-[2px] text-xs md:text-sm 2xl:text-base max-md:border max-md:border-gray-custom-300 max-md:leading-[100%] cursor-pointer"),
  };

  if (props.kind === "button") {
    const handleClick = (e: React.MouseEvent) => {
      props.onClick 
      ? props.onClick(e)
      : props.toggleFilter({ filterType: props.type, filterValue: props.value });
    }
    return (
      <div {...prop} onClick={handleClick}>
        {props.children}
      </div>
    )
  }
  
  const defaultOnClick = (e: React.MouseEvent) => {e.stopPropagation()}
  return (
    <Link href={props.slug || ""} {...prop} onClick={defaultOnClick} prefetch={false}>
      {props.children}
    </Link>
  );
};

export default Pill;
