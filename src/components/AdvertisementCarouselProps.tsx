import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel.tsx"

interface AdvertisementCarouselProps {
  images: string[]
}
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function AdvertisementCarouselProps({images}: AdvertisementCarouselProps) {
  if (!images || images.length ===0) {
    return (
      <>
        <div className="h-48 flex items-center justify-center bg-gray-100">
          No images available.
        </div>
      </>
    )
  }
  const fullImageUrls = images.map(img => `${BASE_URL}${img}`)

  return (
    <>
      <div className="">
      <Carousel className="w-full max-w-lg">
        <div>
        <CarouselContent>
          {fullImageUrls.map((img, index) => (

            <CarouselItem key={index}>
              <div className="aspect-video overflow-hidden rounded-lg">
                <img
                  src={img}
                  alt={`Advertisement image ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
        </div>
      </Carousel>
      </div>
    </>
  )
}