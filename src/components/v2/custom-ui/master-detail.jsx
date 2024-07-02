import { act, createContext, useContext, useState } from 'react';
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

const MasterDetail = ({ className = '', children, ...props }) => {
    const [detail_is_shown, setDetailIsShown] = useState(false);
    const [active_detail, setActiveDetail] = useState(null);

    return (
        <MasterDetailContext.Provider
            value={{
                detail_is_shown,
                setDetailIsShown,
                active_detail,
                setActiveDetail,
            }}
        >
            <div className={'bl-md-viewport overflow-clip ' + ' ' + className}>
                {/* Inside the viewport wrapper... */}
                <div
                    className={
                        'bl-md-main-content flex flex-nowrap max-w-[200%]' +
                        ` ${active_detail ? ' w-[200%]' : ' w-full'}` +
                        `${
                            detail_is_shown
                                ? ' transition-transform translate-x-[-50%]'
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
    const { detail_is_shown, setDetailIsShown } = useMasterDetailContext();

    if (detail_is_shown) {
        return <div className={'w-full' + ' ' + className}>&nbsp;</div>;
    }

    return <div className={'w-full' + ' ' + className}>{children}</div>;
};

const DetailContent = ({ className = '', children, identifier, ...props }) => {
    const {
        detail_is_shown,
        setDetailIsShown,
        active_detail,
        setActiveDetail,
    } = useMasterDetailContext();

    if (active_detail !== identifier) {
        return null;
    }

    const handleContextualBackAction = () => {
        setActiveDetail(null);
        setDetailIsShown(false);
    };

    return (
        <div
            data-md-identifier={identifier}
            data-md-is-shown={detail_is_shown}
            className={'w-full' + ' ' + className}
        >
            {/* Header */}
            <div className="relative mb-8">
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
    const { setDetailIsShown, setActiveDetail } = useMasterDetailContext();

    const handleTriggerAction = () => {
        if (onClick) {
            //If there is a custom on-click handler specified, execute
            //that first before running the rest of our code.
            onClick();
        }

        setActiveDetail(triggerTarget);
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
