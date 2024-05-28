import { Fragment, SyntheticEvent, useCallback, useState } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import {
  Asteroid,
  CreationError,
  Miner,
  Planet,
  useMinersCreate,
  useSocket,
} from "../data";
import IconDelete from "../assets/delete.svg";
import IconArrow from "../assets/arrow-down.svg";

type ModalProps = { item: Planet; isOpen: boolean; onClose: () => void };

export function CreateMinerModal({ isOpen, onClose, item }: ModalProps) {
  const { mutateAsync, isLoading } = useMinersCreate(item._id!);
  const [selected, setSelected] = useState<Asteroid>();
  const [{ asteroids }] = useSocket();
  const [data, setData] = useState<Miner | CreationError>();

  const _onClose = useCallback(() => {
    setTimeout(() => {
      setData(undefined);
    }, 300);
    onClose();
  }, [onClose]);

  const submit = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isLoading) return;

      const formData = new FormData(e.target as HTMLFormElement);
      const values = formData.values();
      const res = await mutateAsync({
        name: values.next().value,
        planet: item._id!,
        x: item.position.x,
        y: item.position.y,
        target: selected?._id || "",
        angle: 0,
        carryCapacity: values.next().value,
        travelSpeed: values.next().value,
        miningSpeed: values.next().value,
        status: 0,
        minerals: 0,
      });

      setData(res);
    },
    [
      isLoading,
      mutateAsync,
      item._id,
      item.position.x,
      item.position.y,
      selected,
    ]
  );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={_onClose}>
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
              <Dialog.Panel className="w-full relative min-w-[450px] bg-[#1A1B2F] max-w-md transform rounded-2xl p-8 text-left align-middle shadow-xl transition-all">
                <IconDelete
                  className="absolute top-[18px] right-[18px] cursor-pointer"
                  onClick={_onClose}
                />
                {!!(data as Miner)?._id ? (
                  <div className="text-center text-base text-white">
                    The miner was successfully created
                  </div>
                ) : (
                  <>
                    <Dialog.Title
                      as="h3"
                      className="text-base font-bold text-white text-center leading-6"
                    >
                      Create a miner
                    </Dialog.Title>

                    <div className="mt-4">
                      <form className="space-y-6" onSubmit={submit}>
                        {/* name */}
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-main"
                          >
                            Name
                          </label>
                          <div className="mt-0">
                            <div className="relative w-full cursor-default overflow-hidden rounded bg-gray-second text-left shadow-md focus:outline-none focus:ring-0 sm:text-sm">
                              <input
                                type="text"
                                name="name"
                                id="name"
                                className="block w-full bg-gray-second rounded border-0 py-1.5 pl-3 text-white shadow-sm focus:outline-none outline-none sm:text-sm sm:leading-6"
                              />
                            </div>
                            {(data as CreationError)?.errors?.name && (
                              <span className="text-[9px] mt-[2px] text-red">
                                {(data as CreationError)?.errors?.name.message}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* planet */}

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-main"
                          >
                            Asteroid
                          </label>
                          <div className="mt-0">
                            <Listbox value={selected} onChange={setSelected}>
                              <div className="relative mt-1">
                                <Listbox.Button className="relative w-full text-white cursor-default rounded bg-gray-second py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                  <span className="block truncate">
                                    {selected?.name || "Please Select"}
                                  </span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <IconArrow
                                      className="text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </Listbox.Button>
                                <Transition
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {asteroids.map((item) => (
                                      <Listbox.Option
                                        key={item._id}
                                        className={({
                                          active,
                                        }: {
                                          active: boolean;
                                        }) =>
                                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                              ? "bg-amber-100 text-amber-900"
                                              : "text-gray-900"
                                          }`
                                        }
                                        value={item}
                                      >
                                        {({ selected }) => (
                                          <>
                                            <span
                                              className={`block truncate ${
                                                selected
                                                  ? "font-medium"
                                                  : "font-normal"
                                              }`}
                                            >
                                              {item.name}
                                            </span>
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </Listbox>
                            {(data as CreationError)?.errors?.target && (
                              <span className="text-[9px] mt-[2px] text-red">
                                Required
                              </span>
                            )}
                          </div>
                        </div>

                        <h3 className="text-base font-bold text-white text-center leading-6">
                          Assign points
                        </h3>

                        <div className="mt-8 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
                          <div className="sm:col-span-2">
                            <label
                              htmlFor="carryCapacity"
                              className="block text-[11px] font-medium leading-6 text-main"
                            >
                              carryCapacity
                            </label>
                            <div className="mt-0">
                              <input
                                type="text"
                                name="carryCapacity"
                                id="carryCapacity"
                                className="block w-full bg-gray-second rounded border-0 py-1.5 pl-3 text-white shadow-sm focus:outline-none outline-none sm:text-sm sm:leading-6"
                              />
                            </div>
                            {(data as CreationError)?.errors?.carryCapacity && (
                              <span className="text-[9px] mt-[2px] text-red">
                                Required
                              </span>
                            )}
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="travelSpeed"
                              className="block text-[11px] font-medium leading-6 text-main"
                            >
                              travelSpeed
                            </label>
                            <div className="mt-0">
                              <input
                                type="text"
                                name="travelSpeed"
                                id="travelSpeed"
                                className="block w-full bg-gray-second rounded border-0 py-1.5 pl-3 text-white shadow-sm focus:outline-none outline-none sm:text-sm sm:leading-6"
                              />
                            </div>
                            {(data as CreationError)?.errors?.travelSpeed && (
                              <span className="text-[9px] mt-[2px] text-red">
                                Required
                              </span>
                            )}
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="miningSpeed"
                              className="block text-[11px] font-medium leading-6 text-main"
                            >
                              miningSpeed
                            </label>
                            <div className="mt-0">
                              <input
                                type="text"
                                name="miningSpeed"
                                id="miningSpeed"
                                className="block w-full bg-gray-second rounded border-0 py-1.5 pl-3 text-white shadow-sm focus:outline-none outline-none sm:text-sm sm:leading-6"
                              />
                            </div>
                            {(data as CreationError)?.errors?.miningSpeed && (
                              <span className="text-[9px] mt-[2px] text-red">
                                Required
                              </span>
                            )}
                          </div>
                          <div
                            className={`${
                              item.minerals < 1000 ? "text-red" : "text-green"
                            } sm:col-span-6 text-center mt-3 text-[11px] w-full`}
                          >
                            Total: {item.minerals}/1000
                          </div>
                        </div>

                        <div className="text-center">
                          <button
                            type="submit"
                            className="bg-[#E1E2EF] text-xs font-black rounded-lg px-8 py-2"
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
