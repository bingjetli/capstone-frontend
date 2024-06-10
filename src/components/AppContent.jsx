import ReservationViewer from './ReservationViewer';

export default function AppContent({ page }) {
    const container_styles = 'h-full md:ms-[100px]';

    switch (page) {
        case 'reservations':
            return (
                <div className={container_styles}>
                    <ReservationViewer />
                </div>
            );
        case 'reservation-requests':
            return (
                <div className="ms-[100px]">TODO: Reservation Requests UI</div>
            );
        case 'blacklist':
            return <div className="ms-[100px]">TODO: Blacklists UI</div>;
        case 'settings':
            return <div className="ms-[100px]">TODO: Settings UI</div>;
        default:
            return <div className={container_styles}>Unknown Page</div>;
    }
}
