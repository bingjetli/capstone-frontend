import AppBar from '@/components/v2/AppBar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ChevronRight, Info } from 'lucide-react';

function Setting({ icon, name }) {
    return (
        <Button
            variant="ghost"
            className="w-full flex justify-between"
        >
            <div className="flex items-center gap-1">
                <span>{icon}</span>
                <span>{name}</span>
            </div>
            <ChevronRight />
        </Button>
    );
}

export default function SettingsRoute() {
    return (
        <div className="flex flex-col w-screen h-screen">
            <AppBar />
            <Separator />
            <div className="grow p-4 w-full max-w-[425px] mx-auto">
                {/* CONTENT */}
                <h1 className="text-3xl leading-relaxed">Settings</h1>
                <Setting
                    name="About"
                    icon={<Info />}
                />
            </div>
        </div>
    );
}
