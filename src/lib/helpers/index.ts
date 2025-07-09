export function wixMediaToUrl(media: string): string {
  if (!media) return "";

  const IMAGE_BASE = "https://static.wixstatic.com/media/";
  const VIDEO_BASE = "https://video.wixstatic.com/video/";

  if (media.startsWith("wix:image://")) {
    const clean = media.replace("wix:image://", "");
    const [mediaId, filenameAndQuery] = clean.split("/");
    const filename = filenameAndQuery.split("#")[0]; // strip off poster info
    return `${IMAGE_BASE}/${filename}`;
  }

  if (media.startsWith("wix:video://")) {
    const clean = media.replace("wix:video://", "");
    const [mediaId, filenameAndQuery] = clean.split("/");
    const filename = filenameAndQuery.split("#")[0];
    return `${VIDEO_BASE}/${filename}`;
  }

  return media; // fallback if it's already a usable URL
}
