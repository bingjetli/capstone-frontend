import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export default function AppHeader() {
    return (
        <div className="appheader flex justify-center px-4 py-2">
            <div className="appheader__content w-full max-w-screen-2xl flex justify-between">
                <div className="appheader-content__left">
                    <a
                        className="default-site-logo"
                        href="/"
                    >
                        Cette
                    </a>
                </div>
                <div className="appheader-content__right">
                    <Button asChild>
                        <Link to="/app/reservations">
                            <span>Try the demo</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
