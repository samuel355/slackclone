'use server'
export const createWorkSpace = async ({
  imageUrl,
  name,
  slug,
  invite_code,
}: {
  imageUrl?: string;
  name: string;
  slug: string;
  invite_code: string;
}) => {
  console.log(imageUrl, name, slug, invite_code);
};
