import Paragraph from "@yoopta/paragraph";
import Blockquote from "@yoopta/blockquote";
import Callout from "@yoopta/callout";
import Code from "@yoopta/code";
import Link from "@yoopta/link";
import { HeadingOne, HeadingTwo, HeadingThree } from "@yoopta/headings";
import { NumberedList, BulletedList, TodoList } from "@yoopta/lists";
import Image from "@yoopta/image";
import { useActionData, useFetcher } from "@remix-run/react";
import type { CFImages } from "cf-images";

export const plugins = [
  Paragraph,
  Blockquote,
  Callout,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  NumberedList,
  BulletedList,
  TodoList,
  Link,
  Code,
  Image.extend({
    options: {
      async onUpload(file) {
        const uploadImage = async () => {
          const formData = new FormData();
          formData.append("image", file);
          const response = await fetch("/action/upload-image", {
            method: "POST",
            body: formData,
          });

          const imageUploadReponse =
            (await response.json()) as CFImages.ImageOperationResult;
          return {
            src: imageUploadReponse.result.variants[0],
            sizes: {
              width: 800,
              height: 800,
            },
            alt: "Uploaded image",
          };
        };

        return uploadImage();
      },
    },
  }),
];
