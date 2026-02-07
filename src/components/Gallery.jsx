

//CArrusel
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "./ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

//Paginacio
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { useNavigate } from "react-router-dom"
import { useState, useRef } from "react"

export function Gallery(){

    const navigate = useNavigate();
    const [_ , setIndex] = useState(0);
    const emblaApi = useRef(null);

    const images = [
        { src: '/ariAndMe.jpg', alt: 'Ari and Me' },
        { src: '/paoAndMe.jpg', alt: 'paoAndMe' },
        { src: '/ariVAndMe.jpg', alt: 'ariVAndMe' },
        { src: '/angryAri.jpg', alt: 'angryAri' },
        { src: '/alicanteGroup.jpg', alt: 'alicanteGroup' },
        { src: '/sexyAri.jpg', alt: 'sexyAri' },
        { src: '/hungryAri.jpg', alt: 'hungryAri' },
        // Agrega más imágenes aquí
    ];


    return(
        <>
        <header className="borradores-header header-fixed">
            <h1 className="header-title">Our Gallery</h1>
            <button type='button' className="return-btn" onClick={()=> navigate('/')} >← Back</button>
        </header>

        <div className="img-display-container flex flex-col items-center justify-center">
            <div className="flex items-center justify-center w-full pt-20 pb-4">
                <Carousel 
                    className="w-full max-w-full px-4 lg:px-6"
                    setApi={(api) => {
                        emblaApi.current = api;
                        if (api) {
                            setIndex(api.selectedIndex);
                            api.on('select', () => {
                                setIndex(api.selectedIndex);
                            });
                        }
                    }}
                >
                    <CarouselContent>
                        {images.map((image, idx) => (
                        <CarouselItem key={idx}>
                            <div className="p-1">
                            <Card>
                                <CardContent className="flex items-center justify-center p-0 overflow-hidden">
                                    <img 
                                        src={image.src} 
                                        alt={image.alt}
                                        className="w-full h-auto object-cover rounded-lg"
                                    />
                                </CardContent>
                            </Card>
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

            <div className="pagination-container">
                <Pagination>
                    <PaginationContent className="text-black">
                        <PaginationItem>
                            <PaginationPrevious 
                                onClick={() => emblaApi.current?.scrollPrev()}
                                href="#"
                                className="text-black"
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext 
                                onClick={() => emblaApi.current?.scrollNext()}
                                href="#"
                                className="text-black"
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

            </div>
        </div>
        
        </>

    )
}