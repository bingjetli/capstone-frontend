import ReservationRequestsViewer from './ReservationRequestsViewer';
import ReservationViewer from './ReservationViewer';
import SettingsViewer from './SettingsViewer';

export default function AppContent({ page, reservationRefreshSignal }) {
    const container_styles = 'h-full md:ms-[100px]';

    switch (page) {
        case 'reservations':
            return (
                <div className={container_styles}>
                    <ReservationViewer
                        reservationRefreshSignal={reservationRefreshSignal}
                    />
                </div>
            );
        case 'reservation-requests':
            return (
                <div className={container_styles}>
                    <ReservationRequestsViewer />
                </div>
            );
        case 'blacklist':
            return <div className="ms-[100px]">TODO: Blacklists UI</div>;
        case 'settings':
            return (
                <div className={container_styles}>
                    <SettingsViewer />
                </div>
            );
        default:
            return <div className={container_styles}>Unknown Page</div>;
    }
}
