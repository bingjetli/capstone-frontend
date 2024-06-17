import { useMemo, useState } from 'react';
import AppContent from './components/AppContent';
import { useAnimate } from 'framer-motion';
import Modal from './components/Modal';
import BackIcon from './components/BackIcon';
import ReservationCreateSidebar from './components/ReservationCreateSidebar';
import SettingsContext from './components/SettingsContext';

/** HOW TO WORKAROUND RENDER'S 50+ second Boot Up Time
 *
 * Have local data that can be loaded immediately while the server tries
 * to fetch the backend data.
 *
 * When the backend data is available, notify the user and update with
 * the fresh data.
 *
 */

export default function App() {
    const [nav_is_open, setNavIsOpen] = useState(false);
    const [secondary_is_open, setSecondaryIsOpen] = useState(false);
    const [sidebar_animref, animateSidebar] = useAnimate();
    const [page, setPage] = useState('reservations');
    //Currently uses prop drilling to send this signal down into the
    //reservation viewer. TODO: update this to use a more legant way
    //to pass state down.
    const [reservation_refresh_signal, setReservationRefreshSignal] =
        useState(false);

    const refreshReservations = () =>
        setReservationRefreshSignal(!reservation_refresh_signal);

    const [settings, setSettings] = useState({
        use24hFormat: true,
    });

    const nav_classlist = useMemo(() => {
        return nav_is_open
            ? 'bg-slate-900 text-neutral-100 absolute h-full top-0 w-full sidebar-transition-open pt-[50px] md:w-1/3 md:shadow-[1px_0_3px_0_rgba(0,0,0,0.5)]'
            : 'bg-slate-900 text-neutral-100 absolute h-full top-0 w-0 overflow-hidden sidebar-transition-close pt-[50px] md:w-[100px]';
    }, [nav_is_open]);

    const toggle_nav_classlist = useMemo(() => {
        return nav_is_open
            ? 'poppins-light text-xs text-neutral-100 h-[50px] align-middle fixed top-0 z-10 px-4 md:px-[38px]'
            : 'poppins-light text-xs md:fixed md:top-0 md:z-10 md:h-[50px] md:align-middle md:text-neutral-100 px-4 md:px-[38px]';
    }, [nav_is_open]);

    const secondary_classlist = useMemo(() => {
        return secondary_is_open
            ? 'bg-slate-900 text-neutral-100 absolute h-full top-0 w-full sidebar-transition-open pt-[50px] md:w-1/3 md:shadow-[1px_0_3px_0_rgba(0,0,0,0.5)]'
            : 'bg-slate-900 text-neutral-100 absolute h-full top-0 w-0 overflow-hidden sidebar-transition-close pt-[50px]';
    }, [secondary_is_open]);

    const toggle_secondary_classlist = useMemo(() => {
        return secondary_is_open
            ? 'poppins-light text-xs text-neutral-100 h-[50px] align-middle fixed top-0 z-10 px-2'
            : 'poppins-light text-xs md:fixed md:top-0 md:z-10 md:h-[50px] md:align-middle px-2';
    }, [secondary_is_open]);

    const toggleNavBar = async () => {
        //if (nav_is_open === true) {
        //    await animateSidebar(sidebar_animref.current, {
        //        "width": "",
        //    });
        //}
        //else {
        //    console.log(sidebar_animref.current.style);
        //    await animateSidebar(sidebar_animref.current, {
        //        "width": "100%",
        //    });
        //}
        setNavIsOpen(!nav_is_open);
    };

    const changePage = (to_this_page) => {
        //Set the page and then close the nav.
        setPage(to_this_page);
        setNavIsOpen(false);
    };

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            <main className="bg-slate-200 w-screen h-screen overflow-hidden cormorant-garamond-medium">
                <header className="bg-slate-50 flex flex-row flex-nowrap justify-between items-center h-[50px]">
                    <div className="flex-1">
                        <button
                            className={toggle_nav_classlist}
                            onClick={() => toggleNavBar()}
                        >
                            {!nav_is_open ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-6"
                                >
                                    <path d="M5.625 3.75a2.625 2.625 0 1 0 0 5.25h12.75a2.625 2.625 0 0 0 0-5.25H5.625ZM3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75ZM3 15.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3.75 18.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </button>
                        <div
                            className={nav_classlist}
                            ref={sidebar_animref}
                        >
                            <button
                                className="poppins-light text-center py-4 block w-full flex flex-col justify-center items-center"
                                onClick={() => changePage('reservations')}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-6"
                                >
                                    <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                                </svg>
                                <div
                                    className={
                                        nav_is_open
                                            ? 'overflow-hidden h-5 sidebar-button-text-transition-open'
                                            : 'overflow-hidden h-0 sidebar-button-text-transition-close'
                                    }
                                >
                                    Reservations
                                </div>
                            </button>
                            <button
                                className="poppins-light text-center py-4 block w-full flex flex-col items-center"
                                onClick={() =>
                                    changePage('reservation-requests')
                                }
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-6"
                                >
                                    <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z"
                                        clipRule="evenodd"
                                    />
                                </svg>

                                <div
                                    className={
                                        nav_is_open
                                            ? 'overflow-hidden h-5 sidebar-button-text-transition-open'
                                            : 'overflow-hidden h-0 sidebar-button-text-transition-close'
                                    }
                                >
                                    Reservation Requests
                                </div>
                            </button>
                            <button
                                className="poppins-light text-center py-4 block w-full flex flex-col items-center"
                                onClick={() => changePage('blacklist')}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="m6.72 5.66 11.62 11.62A8.25 8.25 0 0 0 6.72 5.66Zm10.56 12.68L5.66 6.72a8.25 8.25 0 0 0 11.62 11.62ZM5.105 5.106c3.807-3.808 9.98-3.808 13.788 0 3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788Z"
                                        clipRule="evenodd"
                                    />
                                </svg>

                                <div
                                    className={
                                        nav_is_open
                                            ? 'overflow-hidden h-5 sidebar-button-text-transition-open'
                                            : 'overflow-hidden h-0 sidebar-button-text-transition-close'
                                    }
                                >
                                    Blacklist
                                </div>
                            </button>
                            <button
                                className="poppins-light text-center py-4 block w-full flex flex-col items-center"
                                onClick={() => changePage('settings')}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                                        clipRule="evenodd"
                                    />
                                </svg>

                                <div
                                    className={
                                        nav_is_open
                                            ? 'overflow-hidden h-5 sidebar-button-text-transition-open'
                                            : 'overflow-hidden h-0 sidebar-button-text-transition-close'
                                    }
                                >
                                    Settings
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="text-center forum-regular text-2xl">
                            LOGO
                        </div>
                    </div>
                    <div className="flex-1 flex flex-row-reverse flex-nowrap">
                        {
                            /**We should only render this button if the current
                             * page is in Reservations.
                             */
                            page === 'reservations' ? (
                                <button
                                    className={toggle_secondary_classlist}
                                    onClick={() => setSecondaryIsOpen(true)}
                                >
                                    New Reservation
                                </button>
                            ) : null
                        }

                        {secondary_is_open && page === 'reservations' ? (
                            <ReservationCreateSidebar
                                //TODO: Rename this to onDismiss
                                onClick={(e, data) => setSecondaryIsOpen(data)}
                                refreshReservations={refreshReservations}
                            />
                        ) : null}
                    </div>
                </header>

                <AppContent
                    page={page}
                    reservationRefreshSignal={reservation_refresh_signal}
                />
            </main>
        </SettingsContext.Provider>
    );
}
