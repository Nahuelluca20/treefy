import Paragraph from "@yoopta/paragraph";
import Blockquote from "@yoopta/blockquote";
import Callout from "@yoopta/callout";
import Code from "@yoopta/code";
import Link from "@yoopta/link";
import { HeadingOne, HeadingTwo, HeadingThree } from "@yoopta/headings";
import { NumberedList, BulletedList, TodoList } from "@yoopta/lists";
import Image from "@yoopta/image";
import { CFImages } from "cf-images";

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
      onUpload: async (file: File) => {
        const cfImages = new CFImages({
          token: "LFsRzjEcCNMHc9jueYuYxpSHIEm-WAtWg2-VUnby",
          accountId: "e4ec2904f32944ac7ceb43c2740f3ca3",
          imageAccountHash: "4wV7CQ2npJgGZmWNIBOGqA",
        });
        console.log(file);

        const upload = await cfImages.uploadImage({
          file: file,
          requireSignedURLs: false,
          metadata: { sarasa: "saras" },
        });
        console.log(upload);
        return {
          src: upload.result.variants[0],
          sizes: {
            width: 600,
            height: 600,
          },
        };
      },
    },
  }),
];
