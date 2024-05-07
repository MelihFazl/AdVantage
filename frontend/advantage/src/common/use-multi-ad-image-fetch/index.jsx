import { BASE_URL } from "../constans";
import { useState, useEffect } from "react";

export function useMultiAdImageFetch(imageName, open) {
  const [imageUrls, setImageUrls] = useState([]);
  const [isReceived, setIsReceived] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async (name, index) => {
      try {
        const response = await fetch(
          BASE_URL + "/image_analysis/file/download?fileName=" + name
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const blobData = await response.blob();
        const imageUrl = URL.createObjectURL(blobData);
        setImageUrls((prevImageUrls) => {
          const updatedUrls = [...prevImageUrls];
          updatedUrls[index] = imageUrl;
          return updatedUrls;
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (open && imageName && Array.isArray(imageName) && imageName.length > 0) {
      setImageUrls([]); // Reset imageUrls before fetching new images
      Promise.all(imageName.map((name, index) => fetchData(name, index)))
        .then(() => {
          if (isMounted) {
            setIsReceived(true);
          }
        })
        .catch((error) => console.error("Error fetching images:", error));
    } else {
      setImageUrls([]);
      setIsReceived(false);
    }

    return () => {
      isMounted = false;
    };
  }, [imageName, open]);

  return { isReceived, images: imageUrls };
}
