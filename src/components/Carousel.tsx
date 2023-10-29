import React, {useState, useEffect} from 'react';

const Carousel: React.FC = () => {
    const slides = [
        {
            id: 1,
            imageSrc: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg',
            title: 'Generating Payment Links',
            content: 'You can generate a payment link and share with your recipients. Once money is transferred to your virtual account, your account is going to be credited.',
        },
        {
            id: 2,
            imageSrc: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(22).jpg',
            title: 'Instant Balance Updates',
            content: 'Feel free to create a unique payment link for your recipients and easily share it with them. As soon as the funds are transferred to your virtual account, your account balance will be promptly updated.',
        },
        {
            id: 3,
            imageSrc: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(23).jpg',
            title: 'Realtime Update Confirmation',
            content: 'You will receive a confirmation notification once the funds have been successfully added to your account.',
        },
    ];
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            // Calculate the index of the next slide
            const nextSlideIndex = (activeSlide + 1) % slides.length;
            setActiveSlide(nextSlideIndex);
        }, 5000);

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [activeSlide, slides.length]);

    const handleSlideChange = (index: number) => {
        setActiveSlide(index);
    };

    return (
        <div id="carouselExampleCaptions" className="mb-5">
            <div className="z-[2] p-0">
                {slides.map((slide, index) => (
                    <button
                        key={slide.id}
                        type="button"
                        data-te-target="#carouselExampleCaptions"
                        data-te-slide-to={index}
                        onClick={() => handleSlideChange(index)}
                        className={`mx-[3px] box-content h-[3px] w-[62px] flex-initial cursor-pointer border-0 border-y-[10px] bg-white border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] ${
                            activeSlide === index ? 'opacity-100' : 'opacity-50'
                        } transition-opacity duration-600 ease-cubic-bezier(0.25,0.1,0.25,1.0) motion-reduce:transition-none`}
                        aria-current={activeSlide === index ? true : undefined}
                        aria-label={`Slide ${index + 1}`}
                    />
                ))}
            </div>

            <div className="relative w-full overflow-hidden my-4">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`relative float-left -mr-[100%] w-full transition-transform duration-600 ease-in-out motion-reduce:transition-none
                         transition-opacity duration-1000 ease-in-out ${
                            activeSlide === index ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <div className="col-span-1 flex flex-col rounded-lg shadow text-white w-[80%]">
                            <p className="text-sm font-normal">Step {slide.id}</p>
                            <h5 className="text-sm my-3 font-semibold">{slide.title}</h5>
                            <p className="text-xs font-normal">{slide.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
