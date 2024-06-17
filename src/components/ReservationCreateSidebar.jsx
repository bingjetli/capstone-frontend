import { useCallback, useState } from 'react';
import BackIcon from './BackIcon';
import Modal from './Modal';
import { format, parseISO } from 'date-fns';
import Spinner from './Spinner';

export default function ReservationCreateSidebar({
    onClick,
    refreshReservations,
}) {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');

    const [input_is_valid, setInputValidityState] = useState(null);

    //phase : determines the current phase of the Reservation creation
    //        process. Functionally, it determines which screen to show
    //        inside the content section of the sidebar.
    const [phase, setPhase] = useState(0);
    const [last_phase, setLastPhase] = useState(-1);

    const handleCreateAttemptAction = useCallback(() => {
        //Perform client-side validation. Validate all the input values.
        const staging_input_validity_state = {
            firstName: /^[a-z-]{3,}$/i.test(first_name.trim()),
            lastName: /^[a-z-]{3,}$/i.test(last_name.trim()),
            phoneNumber: /^[0-9]{11,13}$/.test(phonenumber.trim()),
            email: /^[A-z0-9\._-]+@[A-z0-9]+\.[A-z0-9]+$/.test(email.trim()),
            date: /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}$/.test(
                date.trim()
            ),
            notes: /^.{0,255}$/.test(notes.trim()),
        };

        //The date needs to be parsed from the ISO timestring and converted
        //into a unix timestamp.
        //console.log(parseISO(date).getTime());

        if (
            staging_input_validity_state['firstName'] &&
            staging_input_validity_state['lastName'] &&
            staging_input_validity_state['notes'] &&
            staging_input_validity_state['date'] &&
            (staging_input_validity_state['email'] ||
                staging_input_validity_state['phoneNumber']) &&
            true
        ) {
            console.log('validation passed');
            setLastPhase(0);
            setPhase(1);
        }

        setInputValidityState(staging_input_validity_state);
    });

    const handleContextualBackAction = useCallback(() => {
        switch (phase) {
            case 1:
                setLastPhase(1);
                setPhase(0);
                break;
            default:
                onClick(null, false);
        }
    }, [phase]);

    const handleReservationCreateAction = useCallback(() => {
        const post_payload = {
            firstName: first_name,
            lastName: last_name,
            date: parseISO(date).getTime(),
            seats: 2,
            status: 'reserved',
        };
        if (email) {
            post_payload['email'] = email;
        }
        if (phonenumber) {
            post_payload['phoneNumber'] = phonenumber;
        }
        if (notes) {
            post_payload['notes'] = notes;
        }
        console.log(post_payload);

        //Construct the POST request.
        const backend_api_endpoint = import.meta.env.VITE_BACKEND_API_ENDPOINT;
        const fetch_url = `${backend_api_endpoint}/api/reservations/create`;

        fetch(fetch_url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post_payload),
        }).then((r) => {
            console.log(r);
            if (r.status === 201) {
                //The request was successful.
                setLastPhase(2);
                setPhase(3);
            } else {
                //The request was unsuccessful.
                setLastPhase(2);
                setPhase(4);
            }
        });

        //Initialize the loading phase.
        setLastPhase(1);
        setPhase(2);
    });

    return (
        <Modal onClick={(e) => onClick(e, false)}>
            <div className="modal-secondary-wrapper h-full w-full float-end md:w-[20rem] md:shadow-[-3px_0_3px_0px_rgba(0,0,0,0.25)]">
                {/** MODAL NAVIGATION */}
                {/** This div requires a call to .stopPropagation()
                 *   in order to prevent the clicks from bubbling
                 *   up towards the Modal element.
                 */}
                <div
                    className="bg-slate-50 h-full flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/** BUTTON HEADER */}
                    <div className="flex justify-between">
                        {phase < 2 ? (
                            <button
                                className="poppins-light text-xs px-4 py-2 bg-slate-100"
                                onClick={() => handleContextualBackAction()}
                            >
                                <BackIcon />
                            </button>
                        ) : (
                            <div>&nbsp;</div>
                        )}
                    </div>
                    {/** TITLE SECTION */}
                    <h2 className="cormorant-garamond-medium text-2xl uppercase text-center my-2">
                        Create a new Reservation
                    </h2>
                    {/** CONTENT SECTION */}
                    <div className="border-t-2 flex-1 p-4 overflow-y-auto overflow-x-clip flex flex-nowrap w-full">
                        {/** Phase 0 -> Form */}
                        <div
                            className={`overflow-x-clip ${
                                phase <= 0
                                    ? last_phase === -1
                                        ? 'w-full'
                                        : 'w-full animate-width-transition-open'
                                    : 'w-0 animate-width-transition-close'
                            }`}
                        >
                            <label
                                className="text-xs poppins-light"
                                htmlFor="reservation-datetime-input"
                            >
                                Date/Time
                            </label>
                            <input
                                className={`w-full p-2 border ${
                                    input_is_valid !== null &&
                                    input_is_valid.date === false
                                        ? 'border-red-500'
                                        : 'mb-2'
                                }`}
                                type="datetime-local"
                                name="reservation-datetime"
                                id="reservation-datetime-input"
                                value={date}
                                onChange={(e) => setDate(e.target.value.trim())}
                            />
                            <div
                                className={`mb-2 text-xs poppins-light text-red-500 text-right ${
                                    input_is_valid !== null &&
                                    input_is_valid.date === false
                                        ? 'block'
                                        : 'hidden'
                                }`}
                            >
                                Valid Date Required
                            </div>

                            <label
                                className="text-xs poppins-light"
                                htmlFor="reservation-firstname-input"
                            >
                                First Name
                            </label>
                            <input
                                className={`w-full p-2 border ${
                                    input_is_valid !== null &&
                                    input_is_valid.firstName === false
                                        ? 'border-red-500'
                                        : 'mb-2'
                                }`}
                                type="text"
                                placeholder="John"
                                id="reservation-firstname-input"
                                name="reservation-firstname"
                                value={first_name}
                                onChange={(e) =>
                                    setFirstName(e.target.value.trim())
                                }
                            />
                            <div
                                className={`mb-2 text-xs poppins-light text-red-500 text-right ${
                                    input_is_valid !== null &&
                                    input_is_valid.firstName === false
                                        ? 'block'
                                        : 'hidden'
                                }`}
                            >
                                <div>Valid First Name Required.</div>
                                <div>At least 3 characters.</div>
                                <div>Letters only. Hyphens allowed.</div>
                            </div>

                            <label
                                className="text-xs poppins-light"
                                htmlFor="reservation-lastname-input"
                            >
                                Last Name
                            </label>
                            <input
                                className={`w-full p-2 border ${
                                    input_is_valid !== null &&
                                    input_is_valid.lastName === false
                                        ? 'border-red-500'
                                        : 'mb-2'
                                }`}
                                type="text"
                                placeholder="Doe"
                                id="reservation-lastname-input"
                                name="reservation-lastname"
                                value={last_name}
                                onChange={(e) =>
                                    setLastName(e.target.value.trim())
                                }
                            />
                            <div
                                className={`mb-2 text-xs poppins-light text-red-500 text-right ${
                                    input_is_valid !== null &&
                                    input_is_valid.lastName === false
                                        ? 'block'
                                        : 'hidden'
                                }`}
                            >
                                <div>Valid Last Name Required.</div>
                                <div>At least 3 characters.</div>
                                <div>Letters only. Hyphens allowed.</div>
                            </div>

                            <label
                                className="text-xs poppins-light"
                                htmlFor="reservation-phonenumber-input"
                            >
                                Phone Number
                            </label>
                            <input
                                className={`w-full p-2 border ${
                                    input_is_valid !== null &&
                                    (input_is_valid.phoneNumber ||
                                        input_is_valid.email) === false
                                        ? 'border-red-500'
                                        : 'mb-2'
                                }`}
                                type="text"
                                placeholder="18005671234"
                                id="reservation-phonenumber-input"
                                name="reservation-phonenumber"
                                value={phonenumber}
                                onChange={(e) =>
                                    setPhoneNumber(e.target.value.trim())
                                }
                            />
                            <div
                                className={`mb-2 text-xs poppins-light text-red-500 text-right ${
                                    input_is_valid !== null &&
                                    (input_is_valid.phoneNumber ||
                                        input_is_valid.email) === false
                                        ? 'block'
                                        : 'hidden'
                                }`}
                            >
                                <div>
                                    Either a valid phone number or Email
                                    required.
                                </div>
                                <div>Minimum 11 digits. Maximum 13.</div>
                                <div>Digits only.</div>
                            </div>

                            <label
                                className="text-xs poppins-light"
                                htmlFor="reservation-email-input"
                            >
                                Email
                            </label>
                            <input
                                className={`w-full p-2 border ${
                                    input_is_valid !== null &&
                                    (input_is_valid.phoneNumber ||
                                        input_is_valid.email) === false
                                        ? 'border-red-500'
                                        : 'mb-2'
                                }`}
                                type="text"
                                placeholder="example@email.com"
                                id="reservation-email-input"
                                name="reservation-email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value.trim())
                                }
                            />
                            <div
                                className={`mb-2 text-xs poppins-light text-red-500 text-right ${
                                    input_is_valid !== null &&
                                    (input_is_valid.phoneNumber ||
                                        input_is_valid.email) === false
                                        ? 'block'
                                        : 'hidden'
                                }`}
                            >
                                <div>
                                    Either a valid phone number or Email
                                    required.
                                </div>
                            </div>

                            <label
                                className="text-xs poppins-light"
                                htmlFor="reservation-notes-textarea"
                            >
                                Additional Notes
                            </label>
                            <textarea
                                className={`w-full p-2 border ${
                                    input_is_valid !== null &&
                                    input_is_valid.notes === false
                                        ? 'border-red-500'
                                        : 'mb-2'
                                }`}
                                name="reservation-notes"
                                id="reservation-notes-textarea"
                                placeholder="Special Client, Bottle Service, VIP..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            ></textarea>
                            <div
                                className={`border mb-2 text-xs poppins-light text-red-500 ${
                                    input_is_valid !== null &&
                                    input_is_valid.notes === false
                                        ? 'block'
                                        : 'hidden'
                                }`}
                            >
                                Maximum 255 characters allowed.
                            </div>

                            <div className="flex justify-center">
                                <button
                                    className="bg-emerald-700 text-neutral-50 poppins-light text-xs px-4 py-2"
                                    onClick={() => handleCreateAttemptAction()}
                                >
                                    Create
                                </button>
                            </div>
                        </div>

                        {/** Phase 1 -> Confirmation*/}
                        <div
                            className={`overflow-x-clip ${
                                phase === 1
                                    ? 'w-full animate-width-transition-open'
                                    : last_phase === -1
                                    ? 'w-0'
                                    : 'w-0 animate-width-transition-close'
                            }`}
                        >
                            {last_phase !== -1 ? (
                                <div>
                                    <span className="text-xs poppins-light block text-center text-neutral-400">
                                        Create a reservation for{' '}
                                    </span>
                                    {/**TODO ADD SEATS */}
                                    <div className="flex flex-wrap justify-center">
                                        <span className="inline-block text-3xl text-center p-1">
                                            {first_name}
                                        </span>
                                        <span className="inline-block text-3xl text-center p-1">
                                            {last_name}
                                        </span>
                                    </div>
                                    <div className="text-xs poppins-light text-center text-neutral-400">
                                        on the
                                    </div>
                                    <div className="text-3xl text-center p-1">
                                        {format(
                                            parseISO(date),
                                            "do 'of' MMMM, yyyy"
                                        )}
                                    </div>
                                    <div className="text-xs poppins-light text-center text-neutral-400">
                                        at
                                    </div>
                                    <div className="text-3xl text-center p-1">
                                        {format(parseISO(date), 'HH:MM')}
                                    </div>
                                    <div className="mt-12 text-xs poppins-light text-center text-neutral-400">
                                        with the following contact details
                                    </div>
                                    {phonenumber ? (
                                        <div className="text-3xl text-center p-1">
                                            {phonenumber}
                                        </div>
                                    ) : null}
                                    {phonenumber && email ? (
                                        <div className="text-xs poppins-light text-center text-neutral-400">
                                            and
                                        </div>
                                    ) : null}
                                    {email ? (
                                        <div className="text-3xl text-center p-1">
                                            {email}
                                        </div>
                                    ) : null}
                                    {notes ? (
                                        <>
                                            <div className="mt-12 text-xs poppins-light text-center text-neutral-400">
                                                as well as the following notes
                                            </div>
                                            <div className="text-center p-1">
                                                {notes}
                                            </div>
                                        </>
                                    ) : null}

                                    <div className="flex justify-center mt-16 border-t-2 pt-4 pb-16">
                                        <button
                                            className="bg-emerald-700 text-neutral-50 poppins-light text-xs px-4 py-2"
                                            onClick={() =>
                                                handleReservationCreateAction()
                                            }
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        {/** Phase 2 -> Loading */}
                        <div
                            className={`overflow-x-clip ${
                                phase === 2
                                    ? 'w-full animate-width-transition-open'
                                    : last_phase === -1
                                    ? 'w-0'
                                    : 'w-0 animate-width-transition-close'
                            }`}
                        >
                            {phase === 2 ? (
                                <div className="fill-slate-200 flex justify-center items-center w-full h-full">
                                    <Spinner />
                                </div>
                            ) : null}
                        </div>

                        {/** Phase 3 -> Success*/}
                        <div
                            className={`overflow-x-clip ${
                                phase === 3
                                    ? 'w-full animate-width-transition-open'
                                    : last_phase === -1
                                    ? 'w-0'
                                    : 'w-0 animate-width-transition-close'
                            }`}
                        >
                            {phase === 3 ? (
                                <div className="h-full w-full flex flex-col justify-center items-center">
                                    <h3 className="text-4xl text-center poppins-light">
                                        Success
                                    </h3>
                                    <div className="mt-1 poppins-light text-center">
                                        The reservation was created
                                        successfully!
                                    </div>
                                    <button
                                        className="bg-neutral-200 poppins-light text-xs px-4 py-2 mt-8"
                                        onClick={(e) => {
                                            onClick(e, false);
                                            refreshReservations();
                                        }}
                                    >
                                        Continue
                                    </button>
                                </div>
                            ) : null}
                        </div>

                        {/** Phase 4 -> Fail*/}
                        <div
                            className={`overflow-x-clip ${
                                phase === 4
                                    ? 'w-full animate-width-transition-open'
                                    : last_phase === -1
                                    ? 'w-0'
                                    : 'w-0 animate-width-transition-close'
                            }`}
                        >
                            {phase === 4 ? (
                                <div className="h-full w-full flex flex-col justify-center items-center">
                                    <h3 className="text-4xl text-center poppins-light">
                                        Error
                                    </h3>
                                    <div className="mt-1 poppins-light text-center">
                                        There was a problem creating the
                                        reservation.
                                    </div>
                                    <button
                                        className="bg-neutral-200 poppins-light text-xs px-4 py-2 mt-8"
                                        onClick={(e) => {
                                            onClick(e, false);
                                            refreshReservations();
                                        }}
                                    >
                                        Continue
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
