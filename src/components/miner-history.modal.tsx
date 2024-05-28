import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { History, Miner, HistoryStatuses, useMinerHistory } from "../data";
import IconDelete from "../assets/delete.svg";
import { EmptyFallback, Loading } from "./ui";

type ModalProps = { item?: Miner; isOpen: boolean; onClose: () => void };
export function MinerHistoryModal({ isOpen, onClose, item }: ModalProps) {
  const { data, isLoading } = useMinerHistory(item?._id);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full relative min-w-[80vw] bg-[#1A1B2F] max-w-md transform overflow-hidden rounded-2xl p-8 text-left align-middle shadow-xl transition-all">
                <IconDelete
                  className="absolute top-[18px] right-[18px] cursor-pointer"
                  onClick={onClose}
                />
                <Dialog.Title
                  as="h3"
                  className="text-base font-bold text-white text-center leading-6"
                >
                  History of {item?.name}
                </Dialog.Title>

                <div className="mt-4 text-center flex justify-center">
                  {isLoading ? <Loading /> : <HistoryList list={data || []} />}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function HistoryList({ list }: { list: History[] }) {
  return (
    <div className="flex-1 px-4 max-h-[80vh] overflow-auto scrollbar-thin scrollbar-thumb-main scrollbar-track-gray-second">
      {!!list?.length && (
        <table className="w-full text-left">
          <thead className="text-white text-[10px]">
            <tr>
              <th className="py-4">Date</th>
              <th className="py-4">Year</th>
              <th className="py-4">Planet</th>
              <th className="py-4">carryCapacity</th>
              <th className="py-4">travelSpeed</th>
              <th className="py-4">miningSpeed</th>
              <th className="py-4">Position</th>
              <th className="py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {list?.map((item) => (
              <Fragment key={item._id}>
                {/* <MinerRow item={item} /> */}
                <tr className="text-[#9499C3] text-[11px] border-t-[0.5px] border-[#9499C3]">
                  <td className="py-3">
                    {new Date(item.updatedAt).toLocaleString()}
                  </td>
                  <td className="py-3">{item.year}</td>
                  <td className="py-3">{item.planet}</td>
                  <td
                    className={`${
                      item.capacity.current >= item.capacity.max
                        ? "text-green"
                        : ""
                    } py-3 w-[120px]`}
                  >
                    {item.capacity.current}/{item.capacity.max}
                  </td>
                  <td className="py-3">{item.speed.travel}</td>
                  <td className="py-3">{item.speed.mining}</td>
                  <td className="py-3">
                    {item.position.x},{item.position.y}
                  </td>
                  <td className="py-3">{HistoryStatuses[item.status]}</td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      )}

      {list?.length === 0 && <EmptyFallback />}
    </div>
  );
}
