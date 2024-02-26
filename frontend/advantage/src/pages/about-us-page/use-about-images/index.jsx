import { useImageFetch } from "../../../common/use-image-fetch";

export function useAboutImages() {
  const keremImage = useImageFetch("1708972364165-melih.jpeg");
  const kutayImage = useImageFetch("1708972364165-melih.jpeg");
  const mirayImage = useImageFetch("1708972547893-miray.jpeg");
  const utkuImage = useImageFetch("1708972364165-melih.jpeg");
  const melihImage = useImageFetch("1708972364165-melih.jpeg");

  const retVal =
    keremImage.isReceived &&
    kutayImage.isReceived &&
    mirayImage.isReceived &&
    utkuImage.isReceived &&
    melihImage.isReceived
      ? {
          isReceived: true,
          keremImage: keremImage.image,
          kutayImage: kutayImage.image,
          mirayImage: mirayImage.image,
          utkuImage: utkuImage.image,
          melihImage: melihImage.image,
        }
      : { isReceived: false };

  return retVal;
}
