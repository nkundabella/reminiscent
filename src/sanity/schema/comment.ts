export const comment = {
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    {
      name: "message",
      title: "Message",
      type: "text",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "post",
      title: "Post",
      type: "reference",
      to: [{ type: "post" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "authorSessionId",
      title: "Author Session ID",
      type: "string",
      description: "Hidden ID to allow anonymous users to delete their own comments",
      hidden: true,
    },
    {
      name: "approved",
      title: "Approved",
      type: "boolean",
      description: "Comments won't show on the site without approval",
      initialValue: true, // We'll set to true by default for now to see immediate feedback
    },
  ],
};
