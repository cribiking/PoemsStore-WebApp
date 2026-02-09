

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


import { useNavigate } from "react-router-dom"
import { useState, useRef } from "react"

export function Gallery(){

    const navigate = useNavigate();
    const [_ , setIndex] = useState(0);
    const emblaApi = useRef(null);

    const images = [
        { src: '/ariAndMe.webp', alt: 'Ari and Me' },
        { src: '/paoAndMe.jpg', alt: 'Pao and Me' },
        { src: '/ariVAndMe.jpg', alt: 'Ari V and Me' },
        { src: '/angryAri.jpg', alt: 'Angry Ari' },
        { src: '/sexyAri.webp', alt: 'Sexy Ari' },
        { src: '/hungryAri.webp', alt: 'Hungry Ari' },
        { src: '/alicanteGroup.webp', alt: 'Alicante Group' },
        { src: '/alicantePasseig.webp', alt: 'Alicante Passeig' },
        { src: '/ariArnauAbraçats.webp', alt: 'Ari Arnau Abraçats' },
        { src: '/ariArnauAvio.webp', alt: 'Ari Arnau Avió' },
        { src: '/ariArnauCoctel.webp', alt: 'Ari Arnau Coctel' },
        { src: '/ariArnauCoctelHappy.webp', alt: 'Ari Arnau Coctel Happy' },
        { src: '/ariArnauCuina.webp', alt: 'Ari Arnau Cuina' },
        { src: '/ariArnauoporto.webp', alt: 'Ari Arnau Oporto' },
        { src: '/ariArnauOportoHotel.webp', alt: 'Ari Arnau Oporto Hotel' },
        { src: '/ariArnauOportoHOtelV2.webp', alt: 'Ari Arnau Oporto Hotel V2' },
        { src: '/ariArnauPlatja.webp', alt: 'Ari Arnau Platja' },
        { src: '/autocine.webp', alt: 'Autocine' },
        { src: '/bancSorient.webp', alt: 'Banc Sóller' },
        { src: '/cotxeAdeu.webp', alt: 'Cotxe Adéu' },
        { src: '/fotoOporto.webp', alt: 'Foto Oporto' },
        { src: '/fotoTardeo.webp', alt: 'Foto Tardeo' },
        { src: '/mar.webp', alt: 'Mar' },
        { src: '/marc.webp', alt: 'Marc' },
        { src: '/portaventura-fila.webp', alt: 'PortAventura Fila' },
        { src: '/portAventura.webp', alt: 'PortAventura' },
        { src: '/portAventuraPajaro.webp', alt: 'PortAventura Pájaro' },
        { src: '/thor.webp', alt: 'Thor' },
        { src: '/vaixell.webp', alt: 'Vaixell' },
    ];


    return(
        <>
        <header className="borradores-header header-fixed">
            <h1 className="header-title">Our Gallery</h1>
            <button type='button' className="return-btn" onClick={()=> navigate('/')} >← Back</button>
        </header>

        <div className="img-display-container flex flex-col items-center justify-center">
            <div className="flex items-center justify-center w-full pt-5 pb-4">
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
                                        loading={idx === 0 ? "eager" : "lazy"}
                                        decoding="async"
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
            </div>
        </>

    )
}