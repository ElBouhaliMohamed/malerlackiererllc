"use client";
import React from "react";

import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { Template } from "tinacms";
import { PageBlocksContent } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Container } from "../layout/container";
import { Section } from "../layout/section";
import { mermaid } from "./mermaid";

const headlineColorClasses = {
  blue: 'from-blue-400 to-blue-600',
  teal: 'from-teal-400 to-teal-600',
  green: 'from-green-400 to-green-600',
  red: 'from-red-400 to-red-600',
  pink: 'from-pink-400 to-pink-600',
  purple: 'from-purple-400 to-purple-600',
  orange: 'from-orange-300 to-orange-600',
  yellow: 'from-yellow-400 to-yellow-600',
};


export const Content = ({ data }: { data: PageBlocksContent }) => {
  return (
    <Section color={data.color}>
      <Container
        data-aos="fade-up"
        className={`prose prose-lg ${data.color === "primary" ? `prose-primary` : `dark:prose-dark`
          }`}
        data-tina-field={tinaField(data, "body")}
        size="large"
      >
        {data.title && (
          <h3
            data-tina-field={tinaField(data, 'title')}
            className={`w-full relative mb-10 text-5xl font-extrabold tracking-normal leading-tight title-font`}
          >
            <span
              className={`bg-clip-text text-transparent bg-gradient-to-r  ${data.color === 'primary' ? `from-white to-gray-100` : headlineColorClasses['blue']
                }`}
            >
              {data.title}
            </span>
          </h3>
        )}
        <TinaMarkdown
          content={data.body}
          components={{
            mermaid,
          }}
        />
      </Container>
    </Section>
  );
};

export const contentBlockSchema: Template = {
  name: "content",
  label: "Content",
  ui: {
    defaultItem: {
      title: "Title",
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body",
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" },
      ],
    },
  ],
};
