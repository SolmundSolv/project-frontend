import AdminLayout from "../../../../components/Admin/AdminLayout";
import type { NextPageWithLayout } from "../../_app";

import React, { useRef, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Kanban } from "../../../types/responses";
import AddForm from "./AddForm";
import Link from "next/link";
import withAuth from "../WithAuth";

type Task = {
  id: string;
  name: string;
  createdAt: string;
  KanbanTaskLabel: { name: string }[];
  KanbanTaskAttachment: { name: string }[];
  KanbanTaskComment: { name: string }[];
  Employee: { name: string }[];
};

function KanbanBoard({
  title,
  tasks,
  id,
}: {
  title: string;
  tasks: Task[];
  id: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4 rounded-lg bg-gray-200 p-6 shadow-lg">
      <div className="flex h-fit gap-2">
        <h2 className="mb-4 text-lg font-bold">{title}</h2>
        <small className="h-fit rounded-lg bg-blue-600 from-black px-2 align-middle font-bold text-white">
          {tasks?.length}
        </small>
      </div>
      <div className="mb-4 max-h-[560px] overflow-hidden hover:overflow-auto">
        {tasks?.map((task) => (
          <Task
            comments={task.KanbanTaskComment.length}
            workers={task.Employee.length}
            key={task.id}
            {...task}
          />
        ))}
      </div>
      <button
        className="w-full rounded-lg bg-blue-200 py-2 px-4 font-bold text-blue-600 hover:bg-blue-700 hover:text-white"
        onClick={() => setOpen(true)}
      >
        Add Task
      </button>
      <AddForm open={open} setOpen={setOpen} id={id} />
    </div>
  );
}

function Task({
  id,
  createdAt,
  KanbanTaskLabel,
  KanbanTaskAttachment,
  comments = 0,
  workers = 0,
  tags = [],
}: {
  id: string;
  createdAt: string;
  KanbanTaskLabel: { name: string }[];
  KanbanTaskAttachment: { name: string }[];
  comments: number;
  workers: number;
  tags?: string[];
}) {
  return (
    <div className="mb-4 rounded-lg bg-white p-6 shadow-lg">
      <Link
        href={`tasks/${id}`}
        className="mb-2 text-lg font-bold hover:text-blue-500 hover:underline"
      >
        {KanbanTaskLabel[0]?.name}
      </Link>
      <p className="mb-4 max-h-24 overflow-clip font-sans text-gray-700">
        {KanbanTaskAttachment[0]?.name}
      </p>
      <div className="mb-4 flex flex-wrap">
        {tags.map((tag) => (
          <div
            key={tag}
            className="mr-2 mb-2 rounded-md bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
          >
            {tag}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-xs font-semibold text-gray-600">
        <div className="flex gap-2">
          <svg
            className="mr-2 h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
          </svg>
          {createdAt.split("T")[0]}
        </div>
        <div className="flex gap-2">
          <div className="ml-4 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 h-4 w-4 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
              />
            </svg>{" "}
            {comments}
          </div>
          <div className="ml-4 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 h-4 w-4 fill-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>{" "}
            {workers}
          </div>
        </div>
      </div>
    </div>
  );
}

const Tasks = ({
  kanban,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const textRef = useRef<HTMLInputElement>(null);
  if (!kanban) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full bg-slate-100 p-6">
      <div className="mb-4 flex gap-4">
        <button
          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          onClick={() => {
            fetch("http://localhost:3001/kanban/clc3f137b0000tk6wv3ytwdlo", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: textRef.current?.value,
                tasks: [],
              }),
            }).then((res) => {
              if (res.ok) {
                window.location.reload();
              }
            });
          }}
        >
          Create
        </button>
        <input type="text" ref={textRef} placeholder="Board name" />
      </div>
      <div className="h-full rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <div className="flex max-w-[100vw-200px] overflow-x-scroll">
          {kanban.map((item) => (
            <div className="min-w-[25vw] max-w-[30vw] p-4" key={item.id}>
              <KanbanBoard title={item.name} tasks={item.tasks} id={item.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TaskAuth = withAuth(Tasks);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
TaskAuth.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps<{
  kanban: Kanban[];
}> = async (context) => {
  const res = await fetch(
    "http://localhost:3001/kanban/clc3f137b0000tk6wv3ytwdlo"
  );
  const kanban = await res.json();
  return {
    props: {
      kanban,
    },
  };
};
export default TaskAuth;
