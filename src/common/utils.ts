import { Position } from "../data";

export function classNames(...classes: string[] | []) {
  return classes.filter(Boolean).join(" ");
}

export function mapPosition(p: Position) {
  if (!p) return {};
  return {
    // minus 15px to avoid overflow
    x: Math.abs(p.x * 0.8 - 15) + "px",
    y: Math.abs(p.y * 0.8 - 15) + "px",
  };
}

/**
 * Whether a planet's mineal is enough to generate a miner
 * @param num
 * @returns
 */
export function isAbundant(num: number) {
  return num >= 1000;
}

export function getAngle(cx: number, cy: number, ex: number, ey: number) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}

export const ApiEndpoint = "https://asteroids.dev.mediasia.cn/";
