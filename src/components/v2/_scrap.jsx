//ReservationDetailsButton - 1:57PM
                            <CarouselItem>
                                {/* Slave */}
                                <div>
                                    {/* Header */}
                                    <Button
                                        variant="ghost"
                                        onClick={() =>
                                            handleChangeSlaveContentAction(null)
                                        }
                                    >
                                        {/* Contextual Back Button */}
                                        <ChevronLeft />
                                    </Button>
                                </div>
                                <div>
                                    {/* Content */}
                                    {(() => {
                                        switch (slave_content) {
                                            case 'change-datetime':
                                            case 'change-firstname':
                                            case 'change-lastname':
                                            case 'change-seats':
                                            case 'change-email':
                                            case 'change-phonenumber':
                                            case 'change-notes':
                                            case 'delete-confirm':
                                                return (
                                                    <span>{slave_content}</span>
                                                );
                                            default:
                                                return (
                                                    <span>{slave_content}</span>
                                                );
                                        }
                                    })()}
                                </div>
                            </CarouselItem>
//ReservationsDetailsButton - 2:23 PM
    const [carousel_api, setCarouselApi] = useState();
    const [total_items, setTotalItems] = useState(0);
    const [current_item, setCurrentItem] = useState(0);

    const [slave_content, setSlaveContent] = useState(null);

    useEffect(() => {
        if (!carousel_api) {
            //We can't do anything without the carousel API...
            return;
        }

        //Set the initial states for the carousel state variables...
        setTotalItems(carousel_api.scrollSnapList().length);
        setCurrentItem(carousel_api.selectedScrollSnap() + 1);

        //Now setup the event listeners...
        carousel_api.on('select', () => {
            setCurrentItem(carousel_api.selectedScrollSnap() + 1);
        });
    }, [carousel_api]);

    useEffect(() => {
        if (!carousel_api) {
            return;
        }

        switch (slave_content) {
            case 'change-datetime':
                carousel_api.scrollTo(1);
                break;
            case 'change-firstname':
                carousel_api.scrollTo(2);
                break;
            case 'change-lastname':
                carousel_api.scrollTo(3);
                break;
            case 'change-seats':
            case 'change-email':
            case 'change-phonenumber':
            case 'change-notes':
            case 'delete-confirm':
            default:
                carousel_api.scrollTo(0);
        }
    }, [slave_content]);

    const handleChangeSlaveContentAction = (new_slave_content) => {
        setSlaveContent(new_slave_content);
    };
//-------
                    {/* Testing the imperative api methods */}
                    {/* <Button
                        onClick={() => {
                            if (!carousel_api) return;

                            carousel_api.scrollTo(4);
                        }}
                    >
                        To 5
                    </Button> */}
                    <Carousel setApi={setCarouselApi}>
                        <CarouselContent>
                            <CarouselItem>
                                {/* Master */}
                                <div>
                                    {/* Content */}
                                    {/* Header section */}
                                    <div>
                                        <div className="flex flex-nowrap gap-4">
                                            {/* Firstname & Last Name */}
                                            <div className="grow">
                                                <div className="capitalize text-lg">
                                                    {data['firstName']}
                                                </div>
                                                <Separator />
                                                <div className="capitalize text-lg text-muted-foreground">
                                                    {data['lastName']}
                                                </div>
                                            </div>
                                            {/* Seats */}
                                            <div className="">
                                                <div className="text-3xl text-center">
                                                    {data['seats']}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {data['seats'] > 1
                                                        ? 'people'
                                                        : 'person'}
                                                </div>
                                            </div>
                                        </div>
                                        {/* Additional Notes Section */}
                                        {data['notes'] ? (
                                            <div className="mt-2">
                                                {data['notes']}
                                            </div>
                                        ) : null}
                                        {data['email'] ||
                                        data['phoneNumber'] ? (
                                            // Contact Section
                                            <div className="flex mt-2 mb-4 text-muted-foreground">
                                                {data['email'] ? (
                                                    <div className="flex-1 text-xs">
                                                        {data['email']}
                                                    </div>
                                                ) : null}
                                                {data['phoneNumber'] ? (
                                                    <div className="flex-1 text-xs">
                                                        {data['phoneNumber']}
                                                    </div>
                                                ) : null}
                                            </div>
                                        ) : null}
                                    </div>
                                    <Separator />
                                    {/* Content Section */}
                                    <div className="mt-2">
                                        <Button
                                            className="w-full"
                                            variant="secondary"
                                            onClick={() =>
                                                handleChangeSlaveContentAction(
                                                    'change-datetime'
                                                )
                                            }
                                        >
                                            Change Date/Time
                                        </Button>
                                    </div>
                                    <div className="mt-2">
                                        <Button
                                            className="w-full"
                                            variant="secondary"
                                            onClick={() =>
                                                handleChangeSlaveContentAction(
                                                    'change-firstname'
                                                )
                                            }
                                        >
                                            Change First Name
                                        </Button>
                                    </div>
                                    <div className="mt-2">
                                        <Button
                                            className="w-full"
                                            variant="secondary"
                                            onClick={() =>
                                                handleChangeSlaveContentAction(
                                                    'change-lastname'
                                                )
                                            }
                                        >
                                            Change Last Name
                                        </Button>
                                    </div>
                                    <div className="mt-2">
                                        <Button
                                            className="w-full"
                                            variant="secondary"
                                            onClick={() =>
                                                handleChangeSlaveContentAction(
                                                    'change-seats'
                                                )
                                            }
                                        >
                                            Change Seats
                                        </Button>
                                    </div>
                                    <div className="mt-2">
                                        <Button
                                            className="w-full"
                                            variant="secondary"
                                            onClick={() =>
                                                handleChangeSlaveContentAction(
                                                    'change-email'
                                                )
                                            }
                                        >
                                            Change Email
                                        </Button>
                                    </div>
                                    <div className="mt-2">
                                        <Button
                                            className="w-full"
                                            variant="secondary"
                                            onClick={() =>
                                                handleChangeSlaveContentAction(
                                                    'change-notes'
                                                )
                                            }
                                        >
                                            Change Notes
                                        </Button>
                                    </div>
                                    <div className="mt-2">
                                        <Button
                                            className="w-full"
                                            variant="destructive"
                                            onClick={() =>
                                                handleChangeSlaveContentAction(
                                                    'delete-confirm'
                                                )
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </CarouselItem>
                            <CarouselItem>
                                <div
                                    className={
                                        slave_content === 'change-datetime'
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                    }
                                >
                                    {/* Header */}
                                    <Button
                                        variant="ghost"
                                        onClick={() =>
                                            handleChangeSlaveContentAction(null)
                                        }
                                    >
                                        {/* Contextual Back Button */}
                                        <ChevronLeft />
                                    </Button>
                                </div>
                                <div>1</div>
                            </CarouselItem>
                            <CarouselItem>
                                <div
                                    className={
                                        slave_content === 'change-firstname'
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                    }
                                >
                                    {/* Header */}
                                    <Button
                                        variant="ghost"
                                        onClick={() =>
                                            handleChangeSlaveContentAction(null)
                                        }
                                    >
                                        {/* Contextual Back Button */}
                                        <ChevronLeft />
                                    </Button>
                                </div>
                                <div>2</div>
                            </CarouselItem>
                            <CarouselItem>
                                <div
                                    className={
                                        slave_content === 'change-lastname'
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                    }
                                >
                                    {/* Header */}
                                    <Button
                                        variant="ghost"
                                        onClick={() =>
                                            handleChangeSlaveContentAction(null)
                                        }
                                    >
                                        {/* Contextual Back Button */}
                                        <ChevronLeft />
                                    </Button>
                                </div>
                                <div>3</div>
                            </CarouselItem>
                        </CarouselContent>
                        {/* Disable the carousel buttons */}
                        {/* <CarouselPrevious />
                        <CarouselNext /> */}
                    </Carousel>