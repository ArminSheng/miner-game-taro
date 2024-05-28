import { useMemo } from "react";
import { Miner } from "../data";
import IconMiner from "../assets/miner.png";
import { mapPosition } from "../common";
import { Image } from "@tarojs/components";

export function MinerRocker({ item }: { item: Miner }) {
  const { x, y } = useMemo(() => {
    return mapPosition({ x: item.x, y: item.y });
  }, [item.x, item.y]);

  return (
    <Image
      src={IconMiner}
      style={{
        left: x,
        top: y,
        transform: `rotate(-${
          item.targetType !== "Planet" ? 180 - item.angle : item.angle
        }deg)`,
      }}
      className="absolute transition-all ease-linear duration-[1100ms] w-[28px]"
    />
  );
}
