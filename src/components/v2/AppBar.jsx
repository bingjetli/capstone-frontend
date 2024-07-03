import SidebarButton from '@/components/v2/SidebarButton';
import { BackendConnectionIndicator } from '@/components/v2/BackendConnectionIndicator';

export default function AppBar() {
    return (
        <>
            <div className="flex justify-between items-center">
                <SidebarButton className="" />
                <div className="grow text-center">ACME</div>
                <div className="h-10 w-10 flex justify-center items-center">
                    <BackendConnectionIndicator />
                </div>
            </div>
        </>
    );
}
