import { act, createContext, useContext, useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MasterDetailContext = createContext(null);

function useMasterDetailContext() {
    const context = useContext(MasterDetailContext);
    if (!context) {
        throw new Error(
            'A MasterDetail child component was used outside of a MasterDetail component!'
        );
    }

    return context;
}

const MasterDetail = ({
    className = '',
    children,
    asMainView = false,
    active_detail_override = null,
    onActiveDetailChange = null,
    ...props
}) => {
    const [detail_is_shown, setDetailIsShown] = useState(false);
    //For now, we'll keep track of this internally since I don't have time
    //to think of a more efficient solution. But basically, this is tracked
    //internally, and then if the override exists and is changed, then
    //a side effect occurs which changes the internal state. Also everytime
    //the internal state changes, the onActiveDetailChange function will be
    //called if it exists.
    const [active_detail, setActiveDetail] = useState(null);

    const setInternalActiveDetail = (new_active_detail_state) => {
        //Basically this function just checks to see if there is a callback
        //function assigned to onActiveDetailChange, and calls it while updating
        //the internal state. This will effectively synchronize the internal
        //state with the external state.

        setActiveDetail(new_active_detail_state);

        if (onActiveDetailChange) {
            onActiveDetailChange(new_active_detail_state);
        }
    };

    useEffect(() => {
        //Basically this sideeffect runs whenever there is an update to
        //the active_detail_override variable. It first checks to see if
        //the variable is not undefined before running a state update
        //to synchronize the internal state with the external state.
        if (active_detail_override === undefined) {
            //The undefined is important because we want to distinguish
            //between an unintentionally undefined variable and an intentionally
            //nulled variable which signifies that the viewport should
            //return back to the master view.
            return;
        }

        // if (active_detail_override === active_detail) {
        //     //There is also no need to run an internal state update if
        //     //the external state matches the internal state already.
        //     return;
        // }

        setActiveDetail(active_detail_override);
    }, [active_detail_override]);

    return (
        <MasterDetailContext.Provider
            value={{
                detail_is_shown,
                setDetailIsShown,
                active_detail,
                setInternalActiveDetail,
                asMainView,
            }}
        >
            <div className={'bl-md-viewport overflow-clip ' + ' ' + className}>
                {/* Inside the viewport wrapper... */}
                <div
                    className={
                        'bl-md-main-content h-full flex flex-nowrap max-w-[200%]' +
                        ` ${
                            active_detail
                                ? ` w-[200%] ${asMainView ? 'md:w-full' : ''}`
                                : ' w-full'
                        }` +
                        `${
                            detail_is_shown
                                ? ` transition-transform translate-x-[-50%] ${
                                      asMainView ? 'md:translate-x-0' : ''
                                  }`
                                : ' transition-transform translate-x-0'
                        }`
                    }
                >
                    {/* Inside the content wrapper... */}
                    {children}
                </div>
            </div>
        </MasterDetailContext.Provider>
    );
};

const MasterContent = ({ className = '', children, ...props }) => {
    const { detail_is_shown, asMainView } = useMasterDetailContext();

    if (detail_is_shown && !asMainView) {
        return <div className={'w-full' + ' ' + className}>&nbsp;</div>;
    }

    return (
        <div
            className={
                `w-full ${asMainView ? 'md:basis-[320px] md:shrink-0 ' : ''}` +
                ' ' +
                className
            }
        >
            {children}
        </div>
    );
};

const DetailContent = ({ className = '', children, identifier, ...props }) => {
    const {
        detail_is_shown,
        setDetailIsShown,
        active_detail,
        setInternalActiveDetail,
        asMainView,
    } = useMasterDetailContext();

    if (active_detail !== identifier) {
        return null;
    }

    const handleContextualBackAction = () => {
        setInternalActiveDetail(null);
        setDetailIsShown(false);
    };

    return (
        <div
            data-md-identifier={identifier}
            data-md-is-shown={detail_is_shown}
            className={
                `w-full ${asMainView ? 'md:grow ' : ''}` + ' ' + className
            }
        >
            {/* Header */}
            <div className={`relative mb-8 ${asMainView ? '' : ''}`}>
                {/* Contextual Back Icon */}
                <Button
                    variant="ghost"
                    className="absolute top-[-8px] left-[-24px]"
                    onClick={() => handleContextualBackAction()}
                >
                    <ChevronLeft />
                </Button>
            </div>
            {children}
        </div>
    );
};

const DetailTrigger = ({
    className = '',
    children,
    variant = 'ghost',
    asChild = false,
    onClick,
    triggerTarget,
    ...props
}) => {
    const { setDetailIsShown, setInternalActiveDetail } =
        useMasterDetailContext();

    const handleTriggerAction = () => {
        if (onClick) {
            //If there is a custom on-click handler specified, execute
            //that first before running the rest of our code.
            onClick();
        }

        setInternalActiveDetail(triggerTarget);
        setDetailIsShown(true);
    };

    return (
        <Button
            className={className}
            variant={variant}
            asChild={asChild}
            onClick={() => handleTriggerAction()}
        >
            {children}
        </Button>
    );
};

export { MasterDetail, MasterContent, DetailContent, DetailTrigger };
