import { createColumnHelper } from "@tanstack/react-table";
import { convertToRaw, EditorState, convertFromRaw } from "draft-js";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useRef, useState } from "react";
import AdminLayout from "../../../../../components/Admin/AdminLayout";
import SimpleEditor from "../../../../../components/Admin/SimpleEditor";
import Table from "../../../../../components/Admin/Table";
import withAuth from "../../WithAuth";
type EmailTemplatesValue = {
  id: number;
  name: string;
  subject: string;
  message: string;
};

const EmailTemplates = ({
  emailTemplates,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [emailTemplatesState, setEmailTemplatesState] = useState<string>("");
  const columnHelper = createColumnHelper<EmailTemplatesValue>();

  const columns = [
    columnHelper.accessor("name", {
      id: "name",
      cell: (info) => info.getValue(),
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor("subject", {
      cell: (info) => info.getValue(),
      header: () => <span>Subject</span>,
    }),
    columnHelper.accessor("id", {
      cell: (info) => {
        return (
          <button
            onClick={() => {
              handleEditTemplate(info.getValue());
            }}
            className="rounded-lg bg-blue-500 py-2 px-4 font-bold text-white"
          >
            Edit
          </button>
        );
      },
      header: () => <span>Edit</span>,
    }),
    columnHelper.accessor("id", {
      cell: (info) => {
        return (
          <button
            onClick={() => {
              fetch(
                `http://localhost:3001/email/templates/${info.getValue()}`,
                {
                  method: "DELETE",
                }
              ).then((res) => {
                window.location.reload();
              });
            }}
            className="rounded-lg bg-red-500 py-2 px-4 font-bold text-white"
          >
            Delete
          </button>
        );
      },
      header: () => <span>Delete</span>,
    }),
  ];
  const subjectRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const handleEditTemplate = (id: number) => {
    if (emailTemplates === "No data") return;
    const template = emailTemplates.find((template) => template.id === id);
    setEditorState(() => {
      return EditorState.createWithContent(
        convertFromRaw(JSON.parse(template!.message))
      );
    });
    setEmailTemplatesState(id.toString());

    subjectRef.current!.value = template!.subject;
    nameRef.current!.value = template!.name;
  };

  return (
    <div className="grid gap-4 p-6">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-bold">All Email Templates:</h1>
        {emailTemplates === "No data" ? (
          <div className="items-center text-center font-bold">No data</div>
        ) : (
          <Table tableData={emailTemplates} columns={columns} />
        )}
      </div>
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="mb-6 flex justify-between p-2">
          <h1 className="text-2xl font-bold">Email Template Editor</h1>
          <div>
            {emailTemplatesState && (
              <button
                className="mr-2 rounded-lg bg-red-500 py-2 px-4 font-bold text-white"
                onClick={() => {
                  setEmailTemplatesState("");
                  setEditorState(() => EditorState.createEmpty());
                  subjectRef.current!.value = "";
                  nameRef.current!.value = "";
                }}
              >
                Clear
              </button>
            )}
            <button
              className="rounded-lg bg-blue-500 py-2 px-4 font-bold text-white"
              onClick={() => {
                if (!nameRef.current?.value || !subjectRef.current?.value) {
                  alert("Please fill all fields");
                  return;
                }
                fetch(
                  `http://localhost:3001/email/templates/${emailTemplatesState}`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      name: nameRef.current?.value,
                      subject: subjectRef.current?.value,
                      message: JSON.stringify(
                        convertToRaw(editorState.getCurrentContent())
                      ),
                    }),
                  }
                ).then((res) => {
                  if (res.status === 200) {
                    emailTemplatesState
                      ? alert("Email template updated")
                      : alert("Email template added");
                  }
                });
              }}
            >
              {emailTemplatesState ? "Update" : "Add"}
            </button>
          </div>
        </div>
        <div className="mb-4 grid gap-4">
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="name"
            type="text"
            placeholder="Name"
            ref={nameRef}
          />
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="subject"
            type="text"
            placeholder="Subject"
            ref={subjectRef}
          />
        </div>
        <div>
          <SimpleEditor
            editorState={editorState}
            setEditorState={setEditorState}
          />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  emailTemplates: EmailTemplatesValue[] | "No data";
}> = async () => {
  try {
    const res = await fetch("http://localhost:3001/email/templates", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return {
      props: {
        emailTemplates: data,
      },
    };
  } catch (error) {
    return {
      props: {
        emailTemplates: "No data" as unknown as EmailTemplatesValue[],
      },
    };
  }
};
const AuthEmailTemplates = withAuth(EmailTemplates);

AuthEmailTemplates.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AuthEmailTemplates;
