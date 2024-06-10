import { useMemo, useState } from 'react';
import AppContent from './components/AppContent';
import { useAnimate } from 'framer-motion';

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

    const nav_classlist = useMemo(() => {
        return nav_is_open
            ? 'bg-slate-900 text-neutral-100 absolute h-full top-0 w-full sidebar-transition-open pt-[50px] md:w-1/3 md:shadow-[1px_0_3px_0_rgba(0,0,0,0.5)]'
            : 'bg-slate-900 text-neutral-100 absolute h-full top-0 w-0 overflow-hidden sidebar-transition-close pt-[50px] md:w-[100px]';
    }, [nav_is_open]);

    const toggle_nav_classlist = useMemo(() => {
        return nav_is_open
            ? 'poppins-light text-xs text-neutral-100 h-[50px] align-middle fixed top-0 z-10 px-2'
            : 'poppins-light text-xs md:fixed md:top-0 md:z-10 md:h-[50px] md:align-middle md:text-neutral-100 px-2';
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
        <main className="bg-slate-200 w-screen h-screen overflow-hidden cormorant-garamond-medium">
            <header className="bg-slate-50 flex flex-row flex-nowrap justify-between items-center h-[50px]">
                <div className="flex-1">
                    <button
                        className={toggle_nav_classlist}
                        onClick={() => toggleNavBar()}
                    >
                        {nav_is_open ? 'Close Nav' : 'Open Nav'}
                    </button>
                    <div
                        className={nav_classlist}
                        ref={sidebar_animref}
                    >
                        <button
                            className="poppins-light text-center py-4 block w-full"
                            onClick={() => changePage('reservations')}
                        >
                            <div>Re</div>
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
                            className="poppins-light text-center py-4 block w-full"
                            onClick={() => changePage('reservation-requests')}
                        >
                            <div>Rq</div>
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
                            className="poppins-light text-center py-4 block w-full"
                            onClick={() => changePage('blacklist')}
                        >
                            <div>Bl</div>
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
                            className="poppins-light text-center py-4 block w-full"
                            onClick={() => changePage('settings')}
                        >
                            <div>Se</div>
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
                    <button
                        className={toggle_secondary_classlist}
                        onClick={() => setSecondaryIsOpen(!secondary_is_open)}
                    >
                        New Reservation
                    </button>
                    <div className={secondary_classlist}>
                        <div className="flex flex-col gap-4 p-4">
                            <h2 className="cormorant-garamond-medium text-2xl mb-4">
                                Create a new Reservation
                            </h2>
                            <input
                                type="text"
                                placeholder="FirstName"
                                className="text-slate-900 text-center"
                            />
                            <input
                                type="text"
                                placeholder="LastName"
                                className="text-slate-900 text-center"
                            />
                            <input
                                type="phone"
                                placeholder="Phone-number"
                                className="text-slate-900 text-center"
                            />
                            <input
                                type="email"
                                placeholder="example@email.com"
                                className="text-slate-900 text-center"
                            />
                            <input
                                type="date"
                                className="text-slate-900 text-center"
                            />

                            <textarea
                                name="notes"
                                id="notes-ta"
                                placeholder="Notes"
                            ></textarea>

                            <button className="bg-green-700 p-4 poppins-light uppercase">
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <AppContent page={page} />
        </main>
    );
}
