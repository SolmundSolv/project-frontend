import type { ReactElement } from "react";
import React from "react";
import Layout from "../../components/Store/Layout";

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-600">
      <div className="mx-auto grid max-w-2xl gap-6 py-16 px-4 sm:py-24 sm:px-6 lg:max-w-3xl lg:px-8 lg:py-8">
        <section>
          <h3 className="text-3xl font-bold dark:text-white">About</h3>
          <p className="mt-4 tracking-wider dark:text-white">
            Welcome to our rental building equipment company! We are dedicated
            to providing top-quality equipment and exceptional service to our
            customers in the construction and building industries.
          </p>
        </section>
        <section className="flex gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="mr-6 h-48 dark:text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <div>
            <h3 className="text-3xl font-bold dark:text-white">Our Mission</h3>
            <p className="mt-4 tracking-wider dark:text-white">
              At our company, we understand that your success depends on having
              the right equipment to complete your project efficiently and
              effectively. Thats why we offer a wide range of rental equipment,
              from heavy machinery to hand tools, to meet your unique needs.
            </p>
          </div>
        </section>
        <section className="flex gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mr-6 h-48 dark:text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
            />
          </svg>
          <div>
            <h3 className="text-3xl font-bold dark:text-white">Equipment</h3>
            <p className="mt-4 tracking-wider dark:text-white">
              Our equipment is well-maintained, and our knowledgeable staff is
              always available to answer your questions and provide guidance on
              equipment selection and operation. We prioritize safety and ensure
              that all equipment is properly inspected and maintained before and
              after each rental.
            </p>
          </div>
        </section>
        <section className="flex gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mr-6 h-48 dark:text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <div>
            <h3 className="text-3xl font-bold dark:text-white">Convenience</h3>
            <p className="mt-4 tracking-wider dark:text-white">
              We are committed to making the rental process as seamless and
              convenient as possible for our customers. With flexible rental
              options, on-time delivery, and competitive pricing, we make it
              easy for you to get the equipment you need when you need it.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

About.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default About;
