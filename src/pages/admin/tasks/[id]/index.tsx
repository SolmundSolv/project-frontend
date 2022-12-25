import React from "react";
import AdminLayout from "../../../../../components/Admin/AdminLayout";
import type { NextPageWithLayout } from "../../../_app";

function KanbanBoard()
{
    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                <img
                    src="https://unsplash.it/200/200"
                    alt="user"
                    className="my-auto h-8 w-8 rounded-full"
                />
                <div>
                    <p className="font-bold">John Doe</p>
                    <p className="font-semibold text-gray-500">UI/UX Designer</p>
                </div>
            </div>
            <div className="flex gap-4">
                <img
                    src="https://unsplash.it/200/200"
                    alt="user"
                    className="my-auto h-8 w-8 rounded-full"
                />
                <div>
                    <p className="font-bold">John Doe</p>
                    <p className="font-semibold text-gray-500">UI/UX Designer</p>
                </div>
            </div>
            <div className="flex gap-4">
                <img
                    src="https://unsplash.it/200/200"
                    alt="user"
                    className="my-auto h-8 w-8 rounded-full"
                />
                <div>
                    <p className="font-bold">John Doe</p>
                    <p className="font-semibold text-gray-500">UI/UX Designer</p>
                </div>
            </div>
        </div>
    );
}





const TaskPage: NextPageWithLayout = () => {
  return (
    <div className="h-full w-full  bg-slate-100 p-6">
      <h1 className="text-2xl font-bold">Task Details</h1>
      <div className="mt-8 grid grid-cols-[1fr,_2fr] gap-8">
        <div className="flex flex-col gap-8">
          <section className="grid rounded-lg border border-gray-100 bg-white p-6 shadow-lg">
            <h2 className="font-mono font-bold uppercase">information</h2>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="w-full border-b border-gray-200 pb-2 font-semibold">
                Task No
              </div>
              <div className="w-full border-b border-gray-200 pb-2 ">#1244</div>
              <div className="w-full border-b border-gray-200 pb-2 font-semibold">
                Task Title
              </div>
              <div className="w-full border-b border-gray-200 pb-2 ">
                Work on Admin dashboard
              </div>
              <div className="w-full border-b border-gray-200 pb-2 font-semibold">
                Status
              </div>
              <div className="w-full border-b border-gray-200 pb-2 ">
                In progress
              </div>
              <div className="w-full border-b border-gray-200 pb-2 font-semibold">
                Due Date
              </div>
              <div className="w-full border-b border-gray-200 pb-2 ">
                01-03-2023
              </div>
            </div>
          </section>
          <section className="row-start-2 rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
            <h2 className="font-mono font-bold uppercase">Assaign to</h2>
            <div className="mt-6 flex flex-col gap-2">
              <div className="flex gap-4">
                <img
                  src="https://unsplash.it/200/200"
                  alt="user"
                  className="my-auto h-8 w-8 rounded-full"
                />
                <div>
                  <p className="font-bold">John Doe</p>
                  <p className="font-semibold text-gray-500">UI/UX Designer</p>
                </div>
              </div>
              <div className="flex gap-4">
                <img
                  src="https://unsplash.it/200/200"
                  alt="user"
                  className="my-auto h-8 w-8 rounded-full"
                />
                <div>
                  <p className="font-bold">John Doe</p>
                  <p className="font-semibold text-gray-500">UI/UX Designer</p>
                </div>
              </div>
              <div className="flex gap-4">
                <img
                  src="https://unsplash.it/200/200"
                  alt="user"
                  className="my-auto h-8 w-8 rounded-full"
                />
                <div>
                  <p className="font-bold">John Doe</p>
                  <p className="font-semibold text-gray-500">UI/UX Designer</p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="flex flex-col space-y-8">
          <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
            <div>
              <h2 className="font-mono font-bold uppercase">Summary</h2>
              <p className="mt-6 text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quod. Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. Voluptates libero corrupti, rem nostrum
                reiciendis dolorem voluptatem sapiente alias, dignissimos
                tempore optio voluptatum consectetur tenetur magni? Culpa
                repellendus sint beatae saepe.
              </p>
            </div>
            <div className="mt-8">
              <h2 className="font-mono font-bold uppercase">Tasks Tags</h2>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-lg bg-gray-100 px-2 py-1 text-sm font-bold text-gray-500">
                  Tag 1
                </span>
                <span className="rounded-lg bg-gray-100 px-2 py-1 text-sm font-bold text-gray-500">
                  Tag 2
                </span>
                <span className="rounded-lg bg-gray-100 px-2 py-1 text-sm font-bold text-gray-500">
                  Tag 3
                </span>
              </div>
            </div>
          </section>
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-lg">
            <h2 className="font-mono font-bold uppercase">Sub-Tasks</h2>
            <div className="mt-4 flex flex-col space-y-8">
              <ul>
                <li className="flex gap-4">
                  <input type="checkbox" name="1" id="" className="my-auto" />
                  <label htmlFor="1" className="text-gray-500">
                    Sub Task 1
                  </label>
                </li>
                <li className="flex gap-4">
                  <input type="checkbox" name="2" id="" className="my-auto" />
                  <label htmlFor="2" className="text-gray-500">
                    Sub Task 2
                  </label>
                </li>
                <li className="flex gap-4">
                  <input type="checkbox" name="3" id="" className="my-auto" />
                  <label htmlFor="3" className="text-gray-500">
                    Sub Task 3
                  </label>
                </li>
              </ul>
            </div>
          </section>
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-lg">
            <h1 className="font-mono font-bold uppercase">Comments</h1>
            <div className="mt-4 flex flex-col space-y-8">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-100"></div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <h2 className="font-bold">John Doe</h2>
                    <span className="text-gray-500">2 days ago</span>
                  </div>
                  <p className="text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quod. Lorem ipsum, dolor sit amet consectetur
                    adipisicing elit. Voluptates libero corrupti, rem nostrum
                    reiciendis dolorem voluptatem sapiente alias, dignissimos
                    tempore optio voluptatum consectetur tenetur magni? Culpa
                    repellendus sint beatae saepe.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-100">
                  <img
                    src="https://unsplash.it/100/100"
                    className="rounded-full"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <h2 className="font-bold">John Doe</h2>
                    <span className="text-gray-500">2 days ago</span>
                  </div>
                  <p className="text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quod. Lorem ipsum, dolor sit amet consectetur
                    adipisicing elit. Voluptates libero corrupti, rem nostrum
                    reiciendis dolorem voluptatem sapiente alias, dignissimos
                    tempore optio voluptatum consectetur tenetur magni? Culpa
                    repellendus sint beatae saepe.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

TaskPage.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default TaskPage;
