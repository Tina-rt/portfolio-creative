export const useImage = () => {
  /**
   * Transforms a Google Drive link into a direct image link.
   * Handles various Drive URL formats.
   */
  const getDirectImageUrl = (url: string | undefined): string => {
    if (!url) return "";

    // If it's already a direct image link or not a Google Drive link, return it as is
    if (!url.includes("drive.google.com")) {
      return url;
    }

    try {
      let fileId = "";

      // Handle format: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
      if (url.includes("/file/d/")) {
        const parts = url.split("/file/d/");
        if (parts.length > 1 && parts[1]) {
          fileId = parts[1].split("/")[0]!;
        }
      }
      // Handle format: https://drive.google.com/open?id=FILE_ID
      else if (url.includes("id=")) {
        const urlParams = new URL(url).searchParams;
        fileId = urlParams.get("id") || "";
      }
      // Handle format: https://drive.google.com/uc?id=FILE_ID
      else if (url.includes("uc?")) {
        const urlParams = new URL(url).searchParams;
        fileId = urlParams.get("id") || "";
      }

      if (fileId) {
        // Return the direct link format that works best for images (lh3 format)
        return `https://lh3.googleusercontent.com/d/${fileId}`;
      }

      return url;
    } catch (e) {
      console.error("Error parsing Google Drive URL:", e);
      return url;
    }
  };

  return {
    getDirectImageUrl,
  };
};
