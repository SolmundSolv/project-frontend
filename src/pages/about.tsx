import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { ReactElement } from "react";
import React from "react";
import Layout from "../../components/Store/Layout";
import { PageSection } from "../types/responses";

const About = ({
  sections,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!sections) return <div>loading...</div>;
  return (
    <div className="min-h-screen bg-white dark:bg-gray-600">
      <div className="mx-auto grid max-w-2xl gap-6 py-16 px-4 sm:py-24 sm:px-6 lg:max-w-3xl lg:px-8 lg:py-8">
        {sections.map((section) => {
          return (
            <section
              key={section.id}
              className={section?.iconPath && "flex gap-4"}
            >
              {section?.iconPath ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mr-6 h-48 dark:text-white"
                  >
                    <g dangerouslySetInnerHTML={{ __html: section.iconPath }} />
                  </svg>
                  <div>
                    <h3 className="text-3xl font-bold dark:text-white">
                      {section.name}
                    </h3>
                    <p className="mt-4 tracking-wider dark:text-white">
                      {section.value}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-3xl font-bold dark:text-white">
                    {section.name}
                  </h3>
                  <p className="mt-4 tracking-wider dark:text-white">
                    {section.value}
                  </p>
                </>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
};

About.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<{
  sections: PageSection[];
}> = async () => {
  const res1 = await fetch(
    "http://localhost:3001/page/section/cleh8wv6k0000tknc0adnvk5p",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const sections = await res1.json();

  return {
    props: {
      sections,
    },
  };
};

export default About;
