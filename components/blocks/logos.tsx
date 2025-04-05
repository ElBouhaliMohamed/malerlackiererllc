import React from "react";
import type { Template } from "tinacms";
import { PageBlocksLogos } from "../../tina/__generated__/types";
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

const LogoRow = ({ logos }: { logos: PageBlocksLogos['logos'] }) => {
  return <div className="flex gap-10 pr-10 will-change-transform">
    {logos?.map((logoItem, index) => (
      <img
        key={logoItem?.image}
        data-tina-field={tinaField(logoItem, `image`)}
        className="w-32 h-auto object-contain" src={logoItem!.image!} />
    ))}
  </div>
}

export const Logos = ({ data }: { data: PageBlocksLogos }) => {
  return (
    <Section color={data.color}>
      <Container size="large">
        {data.headline && (
          <h3
            data-tina-field={tinaField(data, 'headline')}
            className={`w-full relative mb-10 text-5xl font-extrabold tracking-normal leading-tight title-font`}
          >
            <span
              className={`bg-clip-text text-transparent bg-gradient-to-r  ${data.color === 'primary' ? `from-white to-gray-100` : headlineColorClasses['blue']
                }`}
            >
              {data.headline}
            </span>
          </h3>
        )}
        <div className="overflow-hidden flex max-w-3xl my-0 mx-auto py-5 px-0">
          <LogoRow logos={data.logos ?? []}></LogoRow>
          {/* <LogoRow aria-hidden logos={data.logos ?? []}></LogoRow> */}
        </div>
      </Container>
    </Section>
  );
};

export const logosBlockSchema: Template = {
  name: "logos",
  label: "Logos",
  fields: [
    {
      type: "string",
      label: "Überschrift",
      name: "headline"
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
    {
      type: "object",
      list: true,
      label: "Logos",
      name: "logos",
      fields: [
        {
          type: "image",
          label: "Logo",
          name: "image",
        },
      ],
    }
  ],
};
