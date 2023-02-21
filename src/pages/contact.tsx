import type { ReactElement } from "react";
import React from "react";
import Layout from "../../components/Store/Layout";
import Image from "next/image";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const Contact = ({
  info,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const subjectRef = React.useRef<HTMLInputElement>(null);
  const messageRef = React.useRef<HTMLTextAreaElement>(null);
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("http://localhost:3001/email/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        subject: subjectRef.current?.value,
        message: messageRef.current?.value,
      }),
    }).then((res) => {
      if (res.ok) {
        alert("Message sent successfully!");
      } else {
        alert("Message failed to send.");
      }
    });
  };
  if (!info) {
    return <div>Loading...</div>;
  }
  return (
    <div className="min-h-screen bg-white dark:bg-gray-600">
      <div className="mx-auto grid max-w-2xl gap-6 py-16 px-4 sm:py-24 sm:px-6 lg:max-w-4xl lg:px-8 lg:py-8">
        <div className="grid grid-cols-2">
          <div className="dark:text-white">
            <h3 className="mb-4 text-2xl font-bold dark:text-white">
              Information
            </h3>
            {info.map((item) => (
              <div key={item.id} className="flex gap-2">
                <h4 className="font-bold">{item.name}:</h4>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
          <div>
            <Image
              src="https://www.coxmanufacturing.com/assets/uploads/after.png"
              alt="banner"
              className="w-full object-cover"
              width={1920}
              height={600}
            />
          </div>
        </div>
        <div className="mx-auto w-96 p-6 dark:bg-gray-700 dark:text-white">
          <h3 className="text-center font-bold">Contact us:</h3>
          <form className="flex flex-col" onSubmit={handleFormSubmit}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              ref={nameRef}
              className="dark:text-black"
            />
            <label>Email:</label>
            <input
              type="text"
              name="email"
              ref={emailRef}
              className="dark:text-black"
            />
            <label>Subject:</label>
            <input
              type="text"
              name="subject"
              ref={subjectRef}
              className="dark:text-black"
            />
            <label>Message:</label>
            <textarea
              name="message"
              ref={messageRef}
              className="dark:text-black"
            />
            <input
              type="submit"
              value="Submit"
              className="mt-4 rounded-md bg-yellow-500 px-3 py-4 font-bold hover:bg-yellow-400"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  info: {
    id: string;
    name: string;
    value: string;
  }[];
}> = async () => {
  const res1 = await fetch(`http://localhost:3001/page/info`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const info = await res1.json();
  return {
    props: {
      info,
    },
  };
};

Contact.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Contact;
