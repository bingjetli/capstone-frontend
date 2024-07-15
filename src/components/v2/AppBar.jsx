import SidebarButton from '@/components/v2/SidebarButton';
import { BackendConnectionIndicator } from '@/components/v2/BackendConnectionIndicator';

export default function AppBar() {
    return (
        <div className="appbar flex justify-between items-center">
            <div className="appbar__left">
                <SidebarButton className="" />
            </div>
            <div className="appbar__center">
                <a
                    className="default-site-logo"
                    href="/"
                >
                    Cette
                </a>
            </div>
            <div className="appbar__right flex">
                <BackendConnectionIndicator />
            </div>
        </div>
    );
}
