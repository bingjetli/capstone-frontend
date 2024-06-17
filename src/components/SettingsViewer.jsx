import { useContext, useState } from 'react';
import BackIcon from './BackIcon';
import BookOpen from './BookOpen';
import ChevronRight from './ChevronRight';
import ExclamationCircle from './ExclamationCircle';
import SettingsContext from './SettingsContext';
import SwitchToggle from './SwitchToggle';

export default function SettingsViewer() {
    const { settings, setSettings } = useContext(SettingsContext);

    const [phase, setPhase] = useState(0);
    const [last_phase, setLastPhase] = useState(-1);

    const handlePhaseTransitionAction = (next_phase) => {
        setLastPhase(phase);
        setPhase(next_phase);
    };

    const handleContextualBackAction = () => {
        const current_last_phase = last_phase;
        setLastPhase(phase);
        setPhase(last_phase);
    };

    return (
        <div className="bg-slate-200 w-full h-full max-h-full">
            <div className="h-full flex flex-row flex-nowrap">
                <div
                    className={`bg-slate-50 w-full md:min-w-[300px] ${
                        phase <= 0
                            ? last_phase < 0
                                ? 'w-full'
                                : 'animate-mobile-only-width-transition-open'
                            : 'animate-mobile-only-width-transition-close'
                    }`}
                >
                    <h1 className="text-4xl my-4 mx-8 poppins-light">
                        Settings
                    </h1>

                    <button
                        className="mt-8 border-b-2 flex flex-nowrap gap-4 items-center px-4 w-full"
                        onClick={() => handlePhaseTransitionAction(1)}
                    >
                        <div>
                            <BookOpen />
                        </div>
                        <div className="poppins-light w-full h-full py-4 text-left">
                            Reservation Viewer
                        </div>
                        <div>
                            <ChevronRight />
                        </div>
                    </button>

                    <button
                        className="flex flex-nowrap gap-4 items-center px-4 w-full"
                        onClick={() => handlePhaseTransitionAction(2)}
                    >
                        <div>
                            <ExclamationCircle />
                        </div>
                        <div className="poppins-light w-full h-full py-4 flex-1 text-left">
                            About
                        </div>
                        <div>
                            <ChevronRight />
                        </div>
                    </button>
                </div>
                <div
                    className={`overflow-x-hidden bg-slate-200 w-0 md:w-full ${
                        phase > 0
                            ? 'animate-mobile-only-width-transition-open'
                            : last_phase === -1
                            ? ''
                            : 'animate-mobile-only-width-transition-close'
                    }`}
                >
                    <div className="bg-slate-50 md:hidden">
                        <button
                            className="poppins-light text-xs px-4 py-2 bg-slate-100"
                            onClick={() => handleContextualBackAction()}
                        >
                            <BackIcon />
                        </button>
                    </div>

                    {/** RESERVATION VIEWER SETTINGS PHASE */}
                    {phase === 1 ? (
                        <div className="bg-slate-50 h-full">
                            <h2 className="poppins-light text-3xl mx-8 py-4">
                                Reservation Viewer Settings
                            </h2>

                            <button
                                className="mt-8 border-b-2 flex flex-nowrap gap-4 items-center px-4 w-full"
                                onClick={() => {
                                    const new_settings = {
                                        ...settings,
                                    };
                                    new_settings.use24hFormat =
                                        !settings.use24hFormat;
                                    setSettings(new_settings);
                                    console.log(new_settings);
                                }}
                            >
                                <div className="poppins-light w-full h-full py-4 flex-1 text-left">
                                    Use 24h Time Format
                                </div>
                                <div
                                    className={
                                        settings.use24hFormat
                                            ? 'text-green-500'
                                            : ''
                                    }
                                >
                                    <SwitchToggle
                                        value={settings.use24hFormat}
                                        onToggle={() => null}
                                    />
                                </div>
                            </button>
                        </div>
                    ) : null}

                    {phase === 2 ? (
                        <div className="bg-slate-50 h-full">
                            <h2 className="poppins-light text-3xl mx-8 py-4">
                                About this App
                            </h2>
                            <div className="mx-8 my-4">
                                Created by Bailey Liang
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
