import { Transition, Dialog } from "@headlessui/react";
import { useRouter } from "next/router";
import type { Dispatch, SetStateAction } from "react";

import React, { Fragment, useRef, useState } from "react";

interface Task {
  id: number;
  name: string;
  description: string;
}

const AddForm = ({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
}): JSX.Element => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    fetch(`http://localhost:3001/kanban/clc3f137b0000tk6wv3ytwdlo/${id}`, {
      method: "POST",
      body: JSON.stringify({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        tasks: tasks.map((task) => ({
          title: task.name,
          description: task.description,
        })),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setOpen(false);
    router.reload();
  };

  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = () => {
    setTasks([...tasks, { id: tasks.length + 1, name: "", description: "" }]);
  };

  const handleTaskChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof Task
  ) => {
    const newTasks = [...tasks];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    newTasks[index][field] = event.target.value;
    setTasks(newTasks);
  };

  const handleDeleteTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Panel className="absolute top-1/2 left-1/2 flex w-full max-w-xl -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-white shadow-xl dark:bg-gray-800 dark:text-white">
              <div className="p-6 ">
                <div className="flex justify-between">
                  <h1 className="text-2xl font-bold">Add Task</h1>
                  <button
                    className="font-semibold text-gray-600"
                    onClick={() => setOpen(false)}
                  >
                    X
                  </button>
                </div>
                <div className="p-6">
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                      <label
                        htmlFor="name"
                        className="font-semibold text-gray-600"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        ref={titleRef}
                        className="rounded-md border-none bg-gray-100 p-2"
                      />

                      <label
                        className="font-semibold text-gray-600"
                        htmlFor="email"
                      >
                        Description
                      </label>
                      <input
                        type="description"
                        name="description"
                        id="description"
                        ref={descriptionRef}
                        className="rounded-md border-none bg-gray-100 p-2"
                      />
                      <span className="mt-4 font-semibold">Sub-tasks</span>
                      <div className="flex max-h-80 flex-col overflow-auto p-4">
                        {tasks.map((task, index) => (
                          <div key={task.id} className="flex flex-col">
                            <div className="mx-auto">
                              <span className="font-semibold text-gray-600">
                                Task {task.id}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleDeleteTask(index)}
                                className="ml-2 font-bold text-red-600"
                              >
                                X
                              </button>
                            </div>
                            <label
                              className="font-semibold text-gray-600"
                              htmlFor={`task-${task.id}`}
                            >
                              Title
                            </label>
                            <input
                              type="text"
                              id={`task-${task.id}`}
                              value={task.name}
                              onChange={(event) =>
                                handleTaskChange(event, index, "name")
                              }
                              className="rounded-md border-none bg-gray-100 p-2"
                            />
                            <label
                              className="font-semibold text-gray-600"
                              htmlFor={`task-${task.id}`}
                            >
                              Description
                            </label>
                            <input
                              type="text"
                              id={`task-${task.id}`}
                              value={task.description}
                              onChange={(event) =>
                                handleTaskChange(event, index, "description")
                              }
                              className="rounded-md border-none bg-gray-100 p-2"
                            />
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={handleAddTask}
                          className="mt-2 rounded-md bg-blue-500 px-4 py-3 font-semibold text-white"
                        >
                          Add Task
                        </button>
                      </div>
                      <div className="mt-8 flex justify-center">
                        <button
                          type="button"
                          className="mr-2 rounded-md bg-gray-200 px-4 py-3 font-semibold text-gray-400"
                          onClick={() => setOpen(false)}
                        >
                          Discard
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-blue-500 px-4 py-3 font-semibold text-white"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default AddForm;
