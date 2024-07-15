import AppBar from '@/components/v2/AppBar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ChevronRight, Info } from 'lucide-react';
import {
    DetailContent,
    MasterContent,
    MasterDetail,
} from '../custom-ui/master-detail';
import { H1 } from '../custom-ui/typography';

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
            <MasterDetail>
                <MasterContent>
                    <H1>Settings</H1>
                    <div>adfadsf</div>
                </MasterContent>
                <DetailContent>content 1</DetailContent>
            </MasterDetail>
        </div>
    );
}
