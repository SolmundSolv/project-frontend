import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

type Comment = {
  id: string;
  KanbanTaskCommentLabel: {
    id: string;
    name: string;
  }[];
  KanbanTaskCommentAttachment: {
    id: string;
    name: string;
  }[];
  createdAt: string;
};

const Comments = () => {
  async function getComments() {
    const response = await fetch(
      "http://localhost:3001/kanban/comments/" + id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  }

  const labelRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const id = useRouter().query.id;
  async function CreateComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch(
      `http://localhost:3001/kanban/comments/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label: labelRef.current?.value,
          content: contentRef.current?.value,
        }),
      }
    );
    const data = await response.json();
    contentRef.current!.value = "";
    labelRef.current!.value = "";
    setComments([...comments, data]);
    return data;
  }
  const [comments, setComments] = useState([] as Comment[]);
  React.useEffect(() => {
    getComments().then((data) => {
      setComments(data);
    });
  }, []);

  return (
    <>
      <div className="mt-4 flex flex-col space-y-8">
        <div className="flex gap-4">
          <div className="h-12 w-12 rounded-full bg-gray-100"></div>
          <div className="flex w-full flex-col gap-2">
            {comments.map((comment) => {
              return (
                <div className="flex flex-col gap-2" key={comment?.id}>
                  <div className="flex justify-between">
                    <h2 className="font-bold">
                      {comment?.KanbanTaskCommentLabel[0]?.name}
                    </h2>
                    <span className="text-gray-500">
                      {comment.createdAt.split("T")[0]}
                    </span>
                  </div>
                  <p className="text-gray-500">
                    {comment.KanbanTaskCommentAttachment[0]?.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <form onSubmit={(e) => CreateComment(e)} className="mt-8 grid gap-4">
        <input type="text" name="label" id="label" ref={labelRef} />
        <textarea
          name="content"
          id="content"
          className="w-full"
          ref={contentRef}
        ></textarea>
        <button
          type="submit"
          className="w-fit place-self-end rounded-md bg-blue-600 px-4 py-2 font-bold text-white"
        >
          Send
        </button>
      </form>
    </>
  );
};

export default Comments;
