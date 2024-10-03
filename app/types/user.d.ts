export type UserSession =
  | {
      email: string;
      name: string;
      id?: string | undefined;
      profile_image?: string | undefined;
    }
  | null
  | undefined;

// type Note = {
//   id: string;
//   parent_id?: string | null;
//   title: string;
//   content?: string | null;
//   topic_id?: string | null;
//   date?: string | null;
//   author_id?: string | null;
// };
