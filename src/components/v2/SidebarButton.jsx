import { Menu, BookUser, BookDown, BookX, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

export default function SidebarButton({ className }) {
    return (
        <Sheet>
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
                        <Button variant="ghost">
                            <BookUser />
                            <span className="ms-1">Reservations</span>
                        </Button>
                    </div>
                    <div>
                        <Button variant="ghost">
                            <BookDown />
                            <span className="ms-1">Reservation Requests</span>
                        </Button>
                    </div>
                    <div>
                        <Button variant="ghost">
                            <BookX />
                            <span className="ms-1">Blacklist</span>
                        </Button>
                    </div>
                    <div>
                        <Button variant="ghost">
                            <Settings />
                            <span className="ms-1">Settings</span>
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
