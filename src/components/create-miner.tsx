import { useState, useCallback } from "react";
import IconAdd from "../assets/add-miner.svg";
import { Planet } from "../data";
import { CreateMinerModal } from "./create-miner.modal";

type CreateProps = {
  planet: Planet;
};

export function CreateMiner({ planet }: CreateProps) {
  let [isOpen, setOpen] = useState(false);
  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onClick = useCallback(
    () => (e: React.MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation();
      setOpen(true);
    },
    []
  );
  return (
    <>
      <span
        className="text-[#00F0FF] cursor-pointer text-[11px] font-bold flex items-center"
        onClick={onClick()}
      >
        <IconAdd />
        <span className="ml-1">Create a miner</span>
      </span>
      <CreateMinerModal item={planet} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
