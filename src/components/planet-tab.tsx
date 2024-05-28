import { Fragment, useCallback, useState } from "react";
import { Planet, TickData } from "../data";
import { MinersModal } from "./miner-list.modal";
import { CreateMiner } from "./create-miner";
import { classNames, isAbundant } from "../common";

export function PlanetTab({ data }: { data: TickData }) {
  const { planets } = data;
  let [isOpen, setOpen] = useState(false);
  let [planet, setPlanet] = useState<Planet>();
  const onClose = useCallback(() => {
    setOpen(false);
    setPlanet(undefined);
  }, []);

  const onClickRow = useCallback(
    (item: Planet) => () => {
      setPlanet(item);
      setOpen(true);
    },
    []
  );
  return (
    <>
      <div className="px-4">
        <table className="w-full text-left">
          <thead className="text-white text-[10px]">
            <tr>
              <th className="py-4">Name</th>
              <th className="py-4">Miners</th>
              <th className="py-4">Minerals</th>
            </tr>
          </thead>
          <tbody>
            {planets.map((item) => (
              <Fragment key={item._id}>
                <PlanetRow item={item} onClick={onClickRow(item)} />
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <MinersModal isOpen={isOpen} item={planet} onClose={onClose} />
    </>
  );
}

function PlanetRow({ item, onClick }: { item: Planet; onClick: () => void }) {
  return (
    <tr className="text-[#9499C3] text-[11px] border-b-[0.5px] border-[#9499C3]">
      <td className="py-3 cursor-pointer" onClick={onClick}>
        {item.name}
      </td>
      <td className="py-3 cursor-pointer" onClick={onClick}>
        {item.miners}
      </td>
      <td
        className={classNames(
          isAbundant(item.minerals) ? "text-green" : "",
          "py-3"
        )}
      >
        {item.minerals}/1000
      </td>
      {isAbundant(item.minerals) && (
        <td className="py-3">
          <CreateMiner planet={item} />
        </td>
      )}
    </tr>
  );
}
