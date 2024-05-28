import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Planet, useMiners } from "../data";
import { MinerTab } from "./miner-tab";
import IconDelete from "../assets/delete.svg";

type ModalProps = { item?: Planet; isOpen: boolean; onClose: () => void };
export function MinersModal({ isOpen, onClose, item }: ModalProps) {
  const { data } = useMiners({ planetId: item?._id });

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
              <Dialog.Panel className="w-full relative min-w-[550px] bg-[#1A1B2F] max-w-md transform overflow-hidden rounded-2xl p-8 text-left align-middle shadow-xl transition-all">
                <IconDelete
                  className="absolute top-[18px] right-[18px] cursor-pointer"
                  onClick={onClose}
                />
                <Dialog.Title
                  as="h3"
                  className="text-base font-bold text-white text-center leading-6"
                >
                  List of miners of {item?.name}
                </Dialog.Title>

                <div className="mt-4">
                  <MinerTab showPlanet={false} data={{ miners: data || [] }} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
