import { TickData } from "../data";

export function AsteroidTab({ data }: { data: TickData }) {
  const { asteroids } = data;
  return (
    <div className="px-4">
      <table className="w-full text-left">
        <thead className="text-white text-[10px]">
          <tr>
            <th className="py-4">Name</th>
            <th className="py-4">Minerals</th>
            <th className="py-4">Current miner</th>
            <th className="py-4">Position</th>
          </tr>
        </thead>
        <tbody>
          {asteroids.map((item) => (
            <tr
              key={item.name}
              className="text-[#9499C3] text-[11px] border-b-[0.5px] border-[#9499C3]"
            >
              <td className="py-3">{item.name}</td>
              <td className="py-3">
                {item.minerals} / {item.minerals}
              </td>
              <td className="py-3">{item.currentMiner?.name}</td>
              <td className="py-3">
                {item.position.x},{item.position.y}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
