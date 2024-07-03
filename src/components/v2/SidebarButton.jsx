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
                    <SheetTitle className="">Main Navigation</SheetTitle>
                    <SheetDescription className="hidden">
                        Contains the main navigational links for this web
                        application.
                    </SheetDescription>
                </SheetHeader>
                <Separator />
                <div className="grow">
                    {/** Main Sheet Content */}
                    <div>
                        <Button
                            variant="ghost"
                            asChild
                            onClick={() => setIsOpen(false)}
                        >
                            {/* <a href="/">
                                <BookUser />
                                <span className="ms-1">Reservations</span>
                            </a> */}
                            <Link to={'/'}>
                                <BookUser />
                                <span className="ms-1">Reservations</span>
                            </Link>
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant="ghost"
                            asChild
                            onClick={() => setIsOpen(false)}
                        >
                            {/* <a href="/reservation-requests">
                                <BookDown />
                                <span className="ms-1">
                                    Reservation Requests
                                </span>
                            </a> */}
                            <Link to={'/reservation-requests'}>
                                <BookDown />
                                <span className="ms-1">
                                    Reservation Requests
                                </span>
                            </Link>
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant="ghost"
                            asChild
                            onClick={() => setIsOpen(false)}
                        >
                            {/* <a href="/blacklist">
                                <BookX />
                                <span className="ms-1">Blacklist</span>
                            </a> */}
                            <Link to={'/blacklist'}>
                                <BookX />
                                <span className="ms-1">Blacklist</span>
                            </Link>
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant="ghost"
                            asChild
                            onClick={() => setIsOpen(false)}
                        >
                            {/* <a href="/settings">
                                <Settings />
                                <span className="ms-1">Settings</span>
                            </a> */}
                            <Link to={'/settings'}>
                                <Settings />
                                <span className="ms-1">Settings</span>
                            </Link>
                        </Button>
                    </div>
                </div>
                <Separator />
                <SheetFooter>
                    <p className="text-xs text-muted-foreground">
                        Version 0.1a
                    </p>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
