import { Fragment, useCallback, useState } from "react";
import { Miner, MinerStatuses, TickData } from "../data";
import { EmptyFallback } from "./ui";
import { MinerHistoryModal } from "./miner-history.modal";
import { classNames } from "../common";
import { View } from "@tarojs/components";

export function MinerTab({
  data,
  showPlanet = true,
}: {
  data: Partial<TickData>;
  showPlanet?: boolean;
}) {
  const { miners } = data;
  let [isOpen, setOpen] = useState(false);
  let [miner, setMiner] = useState<Miner>();
  const onClose = useCallback(() => {
    setOpen(false);
    setMiner(undefined);
  }, []);

  const onClickRow = useCallback(
    (item: Miner) => () => {
      setMiner(item);
      setOpen(true);
    },
    []
  );
  return (
    <>
      <View className="px-4">
        {!!miners?.length && (
          <table className="w-full text-left">
            <thead className="text-white text-[10px]">
              <tr>
                <th className="py-4">Name</th>
                {showPlanet && <th className="py-4">Planet</th>}
                <th className="py-4">carryCapacity</th>
                <th className="py-4">travelSpeed</th>
                <th className="py-4">Position</th>
                <th className="py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {miners?.map((item) => (
                <Fragment key={item.name}>
                  {/* <MinerRow item={item} /> */}
                  <tr
                    key={item.name}
                    className="text-[#9499C3] text-[11px] cursor-pointer border-t-[0.5px] border-[#9499C3]"
                    onClick={onClickRow(item)}
                  >
                    <td className="py-3">{item.name}</td>
                    {showPlanet && <td className="py-3">{item.planet.name}</td>}
                    <td
                      className={classNames(
                        item.minerals >= item.carryCapacity ? "text-green" : "",
                        "py-3"
                      )}
                    >
                      {item.minerals}/{item.carryCapacity}
                    </td>
                    <td className="py-3">{item.miningSpeed}</td>
                    <td className="py-3 w-[120px]">
                      {item.x.toFixed()},{item.y.toFixed()}
                    </td>
                    <td className="py-3">{MinerStatuses[item.status]}</td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        )}

        {miners?.length === 0 && <EmptyFallback />}
      </View>
      <MinerHistoryModal isOpen={isOpen} onClose={onClose} item={miner} />
    </>
  );
}
