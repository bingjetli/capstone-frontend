import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { BookDown, BookUser, BookX, Menu, Settings } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SidebarButton({ className }) {
    const [is_open, setIsOpen] = useState(false);

    return (
        <Sheet
            open={is_open}
            onOpenChange={setIsOpen}
        >
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className={className}
                >
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent
                side="left"
                className={
                    'w-full flex flex-col items-center' + ' md:w-[425px]'
                }
            >
                <SheetHeader>
                    <SheetTitle className="hidden">Main Navigation</SheetTitle>
                    <SheetDescription className="hidden">
                        Contains the main navigational links for this web
                        application.
                    </SheetDescription>
                </SheetHeader>
                <div className="main-nav grow flex flex-col w-full">
                    {/** Main Sheet Content */}
                    <Button
                        variant="ghost"
                        asChild
                        onClick={() => setIsOpen(false)}
                    >
                        <Link
                            to={'/app/reservations'}
                            className="w-full"
                        >
                            <div className="w-full flex items-center gap-2">
                                <BookUser />
                                <span className="typography-link">
                                    Reservations
                                </span>
                            </div>
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        asChild
                        onClick={() => setIsOpen(false)}
                    >
                        <Link to={'/app/reservation-requests'}>
                            <div className="w-full flex items-center gap-2">
                                <BookDown />
                                <span className="typography-link">
                                    Reservation Requests
                                </span>
                            </div>
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        asChild
                        onClick={() => setIsOpen(false)}
                        className="w-full"
                    >
                        <Link to={'/app/blacklist'}>
                            <div className="w-full flex items-center gap-2">
                                <BookX />
                                <span className="typography-link">
                                    Blacklist
                                </span>
                            </div>
                        </Link>
                    </Button>
                    {/* <Button
                        variant="ghost"
                        asChild
                        onClick={() => setIsOpen(false)}
                    >
                        <Link to={'/app/settings'}>
                            <div className="w-full flex items-center gap-2">
                                <Settings />
                                <span className="typography-link">
                                    Settings
                                </span>
                                <span className="px-2 py-1 uppercase text-xs bg-yellow-400">
                                    WIP
                                </span>
                            </div>
                        </Link>
                    </Button> */}
                </div>
                <Separator />
                <SheetFooter>
                    <small className="typography-caption">Version 0.1.2</small>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
