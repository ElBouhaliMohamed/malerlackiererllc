import React from "react";
import type { Template } from "tinacms";
import { PageBlocksTestimonials } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { Container } from "../layout/container";

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

const Quotes = ({ quotes }: { quotes: PageBlocksTestimonials['quotes'] }) => {
  return <div className="flex gap-10 pr-10 will-change-transform animate-[scrolling_10s_linear_infinite]">
    {quotes?.map((quoteItem, index) => (
      <div className="w-60 bg-current rounded-md shadow-lg p-5 flex flex-col justify-center items-center min-h-48" key={index}>
        <p
          className="font-thin text-black"
          data-tina-field={tinaField(quoteItem, `quote`)}
        >
          {quoteItem?.quote}
        </p>

        <p
          className="font-bold text-black"
          data-tina-field={tinaField(quoteItem, `author`)}
        >
          {quoteItem?.author}
        </p>
      </div>
    ))}
  </div>
}

export const Testimonials = ({ data }: { data: PageBlocksTestimonials }) => {
  return (
    <Section color={data.color}>
      <Container size="large">
        <h3
          className={`w-full relative mb-10 text-5xl font-extrabold tracking-normal leading-tight title-font`}
        >
          <span
            className={`bg-clip-text text-transparent bg-gradient-to-r  ${data.color === 'primary' ? `from-white to-gray-100` : headlineColorClasses['blue']
              }`}
          >
            Was unsere Kunden sagen
          </span>
        </h3>
        <div className="overflow-hidden flex max-w-3xl fade-x-10 my-0 mx-auto py-5 px-0">

          <Quotes quotes={data.quotes ?? []}></Quotes>
          <Quotes aria-hidden quotes={data.quotes ?? []}></Quotes>
        </div>
      </Container>
    </Section>
  );
};

export const testimonialsBlockSchema: Template = {
  name: "testimonials",
  label: "Testimonials",
  ui: {
    defaultItem: {
      color: "primary",
      quotes: [
        {
          quote:
            "There are only two hard things in Computer Science: cache invalidation and naming things.",
          author: "Phil Karlton",
        },
      ],
    },
  },
  fields: [
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
    {
      type: "object",
      list: true,
      label: "Quotes",
      name: "quotes",
      fields: [
        {
          type: "string",
          ui: {
            component: "textarea",
          },
          label: "Quote",
          name: "quote",
        },
        {
          type: "string",
          label: "Author",
          name: "author",
        },
      ],
    }
  ],
};
