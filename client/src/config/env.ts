const cmsUrl = process.env.CMS_URL;

if (!cmsUrl) {
  throw new Error("CMS_URL is not configured");
}

export const env = {
  CMS_URL: cmsUrl,
  CMS_API_TOKEN: process.env.CMS_API_TOKEN,
};
