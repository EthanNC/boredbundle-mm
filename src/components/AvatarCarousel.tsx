import {
  Carousel,
  CarouselContent,
  type CarouselApi,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { AvatarArray } from "@/lib/constants";
import { getImage } from "@/lib/utils";
import React from "react";

interface props {
  setImage: React.Dispatch<React.SetStateAction<string>>;
}

export default function AvatarCarousel({ setImage }: props) {
  const [api, setApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setImage(AvatarArray[api.selectedScrollSnap()]);
    api.on("select", () => {
      setImage(AvatarArray[api.selectedScrollSnap()]);
    });
  }, [api]);

  return (
    <Carousel className="" setApi={setApi}>
      <CarouselContent>
        {AvatarArray.map((image, index) => (
          <CarouselItem key={index}>
            <img
              src={getImage(image)}
              className="w-24 h-24 rounded-full mx-auto"
              alt={`Avatar ${image}`}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-24" />
      <CarouselNext className="mr-24" />
    </Carousel>
  );
}
