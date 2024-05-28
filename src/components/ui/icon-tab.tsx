import { ReactNode } from "react";
import { classNames } from "../../common";

export type IconTabProps = {
  icon: ReactNode;
  name: string;
  selected: boolean;
};

export function IconTab({ icon, name, selected }: IconTabProps) {
  return (
    <div
      className={classNames(
        selected ? "border-[#32334A]" : "border-transparent",
        "flex flex-col rounded-lg border justify-center items-center px-[19px] py-2"
      )}
    >
      <span className={selected ? "[&>svg>path]:fill-icon-active" : ""}>
        {icon}
      </span>
      <span className="mt-[6px] text-main text-xs">{name}</span>
    </div>
  );
}
