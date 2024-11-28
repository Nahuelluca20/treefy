import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { CFImages } from "cf-images";

export async function action({ request, context }: ActionFunctionArgs) {
  const form = await request.formData();
  const image = form.get("image");

  if (!(image instanceof File)) {
    return { error: "Invalid file upload", status: 400 };
  }
  const { TOKEN_CF_IMAGES, ACCOUNT_ID, IMAGE_ACCOUNT_HASH } =
    context.cloudflare.env;

  const cfImages = new CFImages({
    token: TOKEN_CF_IMAGES,
    accountId: ACCOUNT_ID,
    imageAccountHash: IMAGE_ACCOUNT_HASH,
  });

  try {
    const upload = await cfImages.uploadImage({
      file: image,
      requireSignedURLs: false,
      metadata: { sarasa: "saras" },
    });

    return upload;
  } catch (error) {
    return {
      error: "Failed to upload image",
      status: 500,
    };
  }
}
