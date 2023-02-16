import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import AdminLayout from "../../../../../components/Admin/AdminLayout";
import type { KanbanTask } from "../../../../types/responses";
import withAuth from "../../WithAuth";
import Comments from "./CommentSection";

function statusDesign(status: string) {
  switch (status) {
    case "In progress":
      return "bg-blue-200 text-blue-600";
    case "Done":
      return "bg-green-200 text-green-600";
    case "Canceled":
      return "bg-red-200 text-red-600";
    case "High":
      return "bg-orange-200 text-orange-600";
    default:
      return "bg-gray-200 text-gray-600";
  }
}

function handleChecklistItem(id: string, checked: boolean) {
  fetch(`http://localhost:3001/kanban/checklist/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      checked: !checked,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

const TaskPage = ({
  kanban,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
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
                {kanban?.name}
              </div>
              <div className="w-full border-b border-gray-200 pb-2 font-semibold">
                Status
              </div>
              <div className="w-full border-b border-gray-200 pb-2 ">
                <span
                  className={
                    "rounded px-2 py-1 font-semibold " +
                    statusDesign("In progress")
                  }
                >
                  In progress
                </span>
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
                {kanban?.KanbanTaskAttachment[0]?.name}
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
                {kanban?.KanbanTaskChecklist[0]?.KanbanTaskChecklistItem.map(
                  (item) => {
                    return (
                      <li className="flex gap-4" key={item.id}>
                        <input
                          type="checkbox"
                          name="1"
                          id=""
                          className="my-auto checked:line-through"
                          checked={item.checked}
                          onClick={(e) => {
                            e.currentTarget.checked = !item.checked;
                            handleChecklistItem(item.id, item.checked);
                          }}
                        />
                        <label htmlFor="1" className="text-gray-500">
                          {item.KanbanTaskChecklistItemLabel[0]?.name} -{" "}
                          {item.KanbanTaskChecklistItemAttachment[0]?.name}
                        </label>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          </section>
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-lg">
            <h1 className="font-mono font-bold uppercase">Comments</h1>

            <Comments />
          </section>
        </div>
      </div>
    </div>
  );
};

const AuthTaskPage = withAuth(TaskPage);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
AuthTaskPage.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps<{
  kanban: KanbanTask;
}> = async (context) => {
  const res = await fetch(
    `http://localhost:3001/kanban/task/${context.params?.id}`
  );
  const kanban = await res.json();
  return {
    props: {
      kanban,
    },
  };
};

export default AuthTaskPage;
