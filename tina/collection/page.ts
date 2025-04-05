import type { Collection } from "tinacms";
import { heroBlockSchema } from "@/components/blocks/hero";
import { contentBlockSchema } from "@/components/blocks/content";
import { testimonialsBlockSchema } from "@/components/blocks/testimonials";
import { featureBlockSchema } from "@/components/blocks/features";
import { videoBlockSchema } from "@/components/blocks/video";
import { logosBlockSchema } from "@/components/blocks/logos";

const Page: Collection = {
  label: "Pages",
  name: "page",
  path: "content/pages",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      const filepath = document._sys.breadcrumbs.join("/");
      if (filepath === "home") {
        return "/";
      }
      return `/${filepath}`;
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      description:
        "The title of the page. This is used to display the title in the CMS",
      isTitle: true,
      required: true,
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      ui: {
        visualSelector: true,
      },
      templates: [
        heroBlockSchema,
        //@ts-ignore
        featureBlockSchema,
        contentBlockSchema,
        testimonialsBlockSchema,
        videoBlockSchema,
        logosBlockSchema
      ],
    }
  ],
};

export default Page;
