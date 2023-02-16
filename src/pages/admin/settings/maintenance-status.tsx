import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { ReactElement } from "react";
import AdminLayout from "../../../../components/Admin/AdminLayout";
import withAuth from "../WithAuth";

const MaintenanceStatusPage = ({
  maintenanceStatuses,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  function handleDelete(id: string) {
    return async () => {
      const res = await fetch(
        `http://localhost:3001/product/maintenance/status/${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        window.location.reload();
      } else {
        alert("Failed to delete");
      }
    };
  }

  async function handleUpdate(id: string, visibleOnCreate: boolean) {
    console.log(id, visibleOnCreate);

    const res = await fetch(
      `http://localhost:3001/product/maintenance/status/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          visibleOnCreate,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      console.log(res.status);
      console.log(res.statusText);
    }
  }

  async function handleCreate() {
    const name = prompt("Enter name");
    if (name) {
      const res = await fetch(
        `http://localhost:3001/product/maintenance/status`,
        {
          method: "POST",
          body: JSON.stringify({
            name,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        window.location.reload();
      }
    }
  }

  if (!maintenanceStatuses) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid gap-6 p-6">
      <h1 className="text-2xl font-bold">Maintenance Statuses</h1>
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>

            <span className="font-semibold">Name</span>
          </div>
          <button
            className="rounded-md bg-green-500 p-2 text-white"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
        {maintenanceStatuses.map((status) => (
          <div key={status.id} className="my-2 flex justify-between">
            <div className="flex gap-2">
              <input
                type="checkbox"
                defaultChecked={status.visibleOnCreate}
                className="self-center"
                onChange={(e) => handleUpdate(status.id, e.target.checked)}
              />
              <span className="self-center font-semibold">{status.name}</span>
            </div>

            <button
              className="rounded-md bg-red-500 p-2 text-white"
              onClick={handleDelete(status.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  maintenanceStatuses: { id: string; name: string; visibleOnCreate: boolean }[];
}> = async () => {
  const res = await fetch(
    `${process.env.FETCH_URL}/product/maintenance/status`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const maintenanceStatuses = await res.json();
  return {
    props: {
      maintenanceStatuses,
    },
  };
};

const AuthMaintenanceStatusPage = withAuth(MaintenanceStatusPage);
AuthMaintenanceStatusPage.getLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>;
};
export default AuthMaintenanceStatusPage;
