import { BASE_URL } from "../constans";
import { useState, useEffect } from "react";

export function useAdImageFetch(imageName, open) {
  const [imageUrl, setImageUrl] = useState("");
  const [isReceived, setIsReceived] = useState(false);

  useEffect(() => {
    if (open) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            BASE_URL + "/image_analysis/file/download?fileName=" + imageName
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const blobData = await response.blob();
          const imageUrl = URL.createObjectURL(blobData);
          setImageUrl(imageUrl);
          setIsReceived(true);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();

      // Clean up function to revoke the URL when the component unmounts
      return () => {
        URL.revokeObjectURL(imageUrl);
      };
    } else {
      setImageUrl("");
    }
  }, [open]);

  const retVal = isReceived
    ? { isReceived: true, image: imageUrl }
    : { isReceived: false, image: "" };

  return retVal;
}
