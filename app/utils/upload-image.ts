import { CFImages } from "cf-images";

export async function UploadImage(file: File) {
  const cfImages = new CFImages({
    token: "LFsRzjEcCNMHc9jueYuYxpSHIEm-WAtWg2-VUnby",
    accountId: "e4ec2904f32944ac7ceb43c2740f3ca3",
    imageAccountHash: "4wV7CQ2npJgGZmWNIBOGqA",
    security: {
      preventBrowserUsage: false,
    },
  });

  try {
    const upload = await cfImages.uploadImage({
      file: file,
      requireSignedURLs: false,
      metadata: { sarasa: "saras" },
    });

    return upload.result.variants[0];
  } catch (error) {
    throw new Error();
  }
}
