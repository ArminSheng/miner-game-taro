import { Fragment } from "react";
import { Asteroid, Miner, Planet, useSocket } from "../data";
import IconAsteroid from "../assets/asteroid-dot.png";
import IconPlanet1 from "../assets/planets/planet-1.png";
import IconPlanet2 from "../assets/planets/planet-2.png";
import IconPlanet3 from "../assets/planets/planet-3.png";
import Background from "../assets/background.png";
import { classNames, isAbundant, mapPosition } from "../common";
import { MinerRocker } from "./MinerRocket";
import { Image } from "@tarojs/components";

const PlanetIcons = [IconPlanet1, IconPlanet2, IconPlanet3];
console.log({ Background });

export function Galaxy() {
  const [{ currentTick, asteroids, planets, miners }] = useSocket();

  return (
    <div className="pt-5 pr-8">
      <div className="text-base text-white mb-3 font-bold">
        {currentTick} YEARS
      </div>
      <div className="w-[800px] h-[800px] relative overflow-hidden">
        {/* <img src={Background} alt="galaxy" className="w-full h-full" /> */}
        <Image src={Background} />
        <Asteroids items={asteroids} />
        <Planets items={planets} />
        <Miners items={miners} />
      </div>
    </div>
  );
}

function Miners({ items }: { items: Miner[] }) {
  return (
    <>
      {items.map((item, idx) => {
        return (
          <Fragment key={item._id}>
            <MinerRocker item={item} />
          </Fragment>
        );
      })}
    </>
  );
}

function Planets({ items }: { items: Planet[] }) {
  return (
    <>
      {PlanetIcons.map((Icon, idx) => {
        const { x, y } = mapPosition(items[idx]?.position);
        return (
          <div
            className="flex flex-col items-center absolute"
            key={idx}
            style={{
              left: x,
              top: y,
            }}
          >
            <div className="relative">
              {/* <Icon /> */}
              <Image src={Icon} />
              <span
                className={classNames(
                  isAbundant(items[idx]?.minerals)
                    ? "text-green"
                    : "text-white",
                  "mt-3 absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-[30px]"
                )}
              >
                {items[idx]?.minerals}/1000
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}

function Asteroids({ items }: { items: Asteroid[] }) {
  return (
    <>
      {items.map((item, idx) => {
        const { x, y } = mapPosition(item.position);
        return (
          <Image
            key={idx}
            src={IconAsteroid}
            style={{
              left: x,
              top: y,
            }}
            className="w-[30px] absolute"
          />
        );
      })}
    </>
  );
}
