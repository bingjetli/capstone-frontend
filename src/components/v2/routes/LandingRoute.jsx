import { Separator } from '@/components/ui/separator';
import AppBar from '../AppBar';
import AppHeader from '../AppHeader';
import { H1, H2 } from '../custom-ui/typography';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import AppFooter from '../AppFooter';

export default function LandingRoute() {
    return (
        <>
            <AppHeader />
            <Separator />
            <div className="hero-wrapper bg-gradient-to-b from-transparent to-slate-200 flex justify-center">
                <div className="hero-wrapper__content w-full md:max-w-screen-lg">
                    <div className="hero-content-wrapper py-8 sm:flex sm:flex-col">
                        <div className="hero-content-wrapper__copy px-8 max-w-sm sm:self-center sm:text-center md:max-w-md lg:max-w-lg">
                            <div>
                                <H1>Modernize Your Booking Workflow!</H1>
                            </div>
                            <p className="mt-4">
                                Empower Your Staff with User-Friendly
                                Reservation Tools!
                            </p>
                            <Button
                                asChild
                                className="mt-8"
                            >
                                <Link to="/app/reservations">
                                    See It in Action
                                </Link>
                            </Button>
                        </div>
                        <div className="hero-content-wrapper__images relative mt-80 max-w-full overflow-x-clip md:mt-[22rem]">
                            <img
                                src="/landing-hero-1.jpeg"
                                alt="hero-image-full"
                                className="absolute shadow-md rounded-md object-cover object-left h-[14rem] bottom-4 left-[10vw] sm:left-[16vw] md:h-72 lg:left-36"
                            />
                            <img
                                src="/landing-hero-2.jpeg"
                                alt="hero-image-mobile"
                                className="absolute shadow-md rounded-md max-w-36 object-contain right-[10vw] bottom-0 sm:right-[16vw] md:max-w-44 lg:right-36"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="features-wrapper flex justify-center">
                <div className="features-wrapper__content max-w-screen-lg my-16">
                    <div className="feature-1-wrapper px-8 sm:flex sm:justify-center sm:gap-8 lg:px-0">
                        <div className="feature-1-wrapper__copy-wrapper sm:flex sm:flex-col sm:justify-center md:max-w-md">
                            <H2>Simple, Easy, Effective</H2>
                            <p className="mt-4">
                                No bloat, no learning curve. Simple, easy
                                reservation management. Just deploy and go – no
                                training required. Spend less time learning how
                                to use the app and more time actually using it.
                            </p>
                        </div>
                        <div className="flex items-center justify-center sm:max-w-sm mt-4 sm:mt-0">
                            <Carousel opts={{ loop: true }}>
                                <CarouselContent>
                                    <CarouselItem>
                                        <div className="p-2">
                                            <img
                                                src="/feature-1-image-1.png"
                                                alt="feature-1-image-1"
                                                className="rounded-md shadow-md"
                                            />
                                        </div>
                                    </CarouselItem>
                                    <CarouselItem>
                                        <div className="p-2">
                                            <img
                                                src="/feature-1-image-2.png"
                                                alt="feature-1-image-2"
                                                className="rounded-md shadow-md"
                                            />
                                        </div>
                                    </CarouselItem>
                                </CarouselContent>
                            </Carousel>
                        </div>
                    </div>

                    <div className="feature-2-wrapper mt-32 px-8 sm:flex sm:flex-row-reverse sm:justify-center sm:gap-8 lg:px-0">
                        <div className="feature-2-wrapper__copy-wrapper sm:flex sm:flex-col sm:justify-center md:max-w-md">
                            <H2>Reliable and Secure Data Hosting</H2>
                            <p className="mt-4">
                                Rest easy knowing your data is safe and secure
                                with MongoDB. Enjoy peace of mind with
                                industry-standard protection and reliable
                                backups, ensuring your information is always
                                protected from loss.
                            </p>
                        </div>
                        <div className="flex items-center justify-center sm:max-w-sm mt-4 sm:mt-0">
                            <img
                                src="/feature-2-image-1.png"
                                alt="feature-2-image"
                                className="rounded-md"
                            />
                        </div>
                    </div>

                    <div className="feature-3-wrapper mt-32 px-8 sm:flex sm:justify-center sm:gap-8 lg:px-0">
                        <div className="feature-3-wrapper__copy-wrapper sm:flex sm:flex-col sm:justify-center md:max-w-md">
                            <H2>Integrate Reservation Requests with Ease</H2>
                            <p className="mt-4">
                                Integrate seamlessly with your website using a
                                straightforward API call. Enable customers to
                                easily request reservations, enhancing
                                engagement and adding significant value to your
                                site.
                            </p>
                        </div>
                        <div className="flex items-center justify-center sm:max-w-sm mt-4 sm:mt-0">
                            <img
                                src="feature-3-image-1.jpeg"
                                alt="feature-3-image"
                                className="rounded-md shadow-md"
                            />
                        </div>
                    </div>

                    <div className="feature-4-wrapper mt-32 px-8 sm:flex sm:flex-row-reverse sm:justify-center sm:gap-8 lg:px-0">
                        <div className="feature-4-wrapper__copy-wrapper sm:flex sm:flex-col sm:justify-center md:max-w-md">
                            <H2>
                                Secure Your System with Blacklist Management
                            </H2>
                            <p className="mt-4">
                                Safeguard your system integrity by implementing
                                blacklists for emails and phone numbers. This
                                feature prevents misuse, protecting your
                                reservation request system from abuse.
                            </p>
                        </div>
                        <div className="flex items-center justify-center sm:max-w-sm mt-4 sm:mt-0">
                            <img
                                src="/feature-4-image-1.jpeg"
                                alt="feature-4-image"
                                className="rounded-md shadow-md"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-cta-wrapper bg-slate-100 py-16 px-8">
                <div className="main-cta-wrapper__content max-w-screen-lg mx-auto">
                    <div className="main-cta-content-wrapper max-w-lg mx-auto">
                        <H2>Explore Our Demo Now!</H2>
                        <p className="mt-4">
                            No Sign-Up, No Fees, No Hassle – Experience It for
                            Free Now!
                        </p>
                        <div className="text-center">
                            <Button className="mt-16">Try It Now</Button>
                        </div>
                    </div>
                </div>
            </div>
            <AppFooter />
        </>
    );
}
