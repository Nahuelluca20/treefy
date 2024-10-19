import Paragraph from "@yoopta/paragraph";
import Blockquote from "@yoopta/blockquote";
import Callout from "@yoopta/callout";
import Code from "@yoopta/code";
import Link from "@yoopta/link";
import { HeadingOne, HeadingTwo, HeadingThree } from "@yoopta/headings";
import { NumberedList, BulletedList, TodoList } from "@yoopta/lists";

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
];
