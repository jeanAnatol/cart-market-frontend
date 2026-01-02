import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel.tsx"
import {resolveImageUrl} from "../services/api.imageUrl.ts";

type AdvertisementImagesProps = {
  images: string[]
}

export default function AdvertisementImages({ images }: AdvertisementImagesProps) {
  if (!images || images.length === 0) {
    return (
      <div className="h-72 flex items-center justify-center bg-gray-200 rounded mb-10">
        <span className="text-gray-500">No images available</span>
      </div>
    )
  }
  console.log("AdvertisementImages", images)
  
  return (
    <>
      <div className="">
    <Carousel className="mb-10">
      <CarouselContent>
        {images.map((url, index) => (
          
          <CarouselItem key={index}>
            <img
              src={resolveImageUrl(url)}
              alt={`Advertisement image ${index + 1}`}
              className="w-full object-cover rounded"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
      </div>
    </>
  )
}
