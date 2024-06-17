import { useState } from 'react';
import BackIcon from './BackIcon';
import Modal from './Modal';
import Spinner from './Spinner';
import { parseISO } from 'date-fns';

export default function ReservationModal({
    isShown,
    setVisibility,
    data,
    refreshReservations,
}) {
    const {
        //firstName,
        //lastName,
        //tableId,
        status,
        //notes,
        //date,
        //phoneNumber,
        //email,
    } = data;

    const [first_name, setFirstName] = useState(data.firstName);
    const [last_name, setLastName] = useState(data.lastName);
    const [phonenumber, setPhoneNumber] = useState(data.phoneNumber);
    const [email, setEmail] = useState(data.email ?? '');
    const [date, setDate] = useState(data.date);
    const [notes, setNotes] = useState(data.notes);

    const [input_is_valid, setInputValidityState] = useState(true);

    const [phase, setPhase] = useState(0);
    const [last_phase, setLastPhase] = useState(-1);

    function hideModal(e) {
        setVisibility(false);
    }

    const handlePhaseTransitionAction = (next_phase) => {
        setLastPhase(phase);
        setPhase(next_phase);
    };

    const handleContextualBackAction = () => {
        switch (phase) {
            case 4:
            case 14:
            case 13:
            case 12:
            case 11:
            case 10:
                setLastPhase(phase);
                setPhase(0);
                break;
            case 0:
                setVisibility(false);
                break;
            default:
                return;
        }
    };

    const handleUpdateFirstNameAttemptAction = () => {
        const staging_input_validity_state = /^[a-z-]{3,}$/i.test(
            first_name.trim()
        );

        if (staging_input_validity_state === true) {
            //The input passed the validity test, so we run the update
            //fetch request.
            const post_payload = {
                id: data._id,
                firstName: first_name.trim(),
            };

            console.log(post_payload);

            //Construct the POST request.
            const backend_api_endpoint = import.meta.env
                .VITE_BACKEND_API_ENDPOINT;
            const fetch_url = `${backend_api_endpoint}/api/reservations/update/firstName`;

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
                if (r.status === 200) {
                    //The request was successful.
                    setLastPhase(phase);
                    setPhase(2);
                } else {
                    //The request was unsuccessful.
                    setLastPhase(phase);
                    setPhase(3);
                }
            });

            setLastPhase(phase);
            setPhase(1);
        }

        setInputValidityState(staging_input_validity_state);
    };

    const handleUpdateLastNameAttemptAction = () => {
        const staging_input_validity_state = /^[a-z-]{3,}$/i.test(
            last_name.trim()
        );

        if (staging_input_validity_state === true) {
            //The input passed the validity test, so we run the update
            //fetch request.
            const post_payload = {
                id: data._id,
                lastName: last_name.trim(),
            };

            console.log(post_payload);

            //Construct the POST request.
            const backend_api_endpoint = import.meta.env
                .VITE_BACKEND_API_ENDPOINT;
            const fetch_url = `${backend_api_endpoint}/api/reservations/update/lastName`;

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
                if (r.status === 200) {
                    //The request was successful.
                    setLastPhase(phase);
                    setPhase(2);
                } else {
                    //The request was unsuccessful.
                    setLastPhase(phase);
                    setPhase(3);
                }
            });

            setLastPhase(phase);
            setPhase(1);
        }

        setInputValidityState(staging_input_validity_state);
    };

    const handleUpdatePhoneNumberAttemptAction = () => {
        const staging_input_validity_state = /^[0-9]{11,13}$/.test(
            phonenumber.trim()
        );

        if (staging_input_validity_state === true) {
            //The input passed the validity test, so we run the update
            //fetch request.
            const post_payload = {
                id: data._id,
                phoneNumber: phonenumber.trim(),
            };

            console.log(post_payload);

            //Construct the POST request.
            const backend_api_endpoint = import.meta.env
                .VITE_BACKEND_API_ENDPOINT;
            const fetch_url = `${backend_api_endpoint}/api/reservations/update/phoneNumber`;

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
                if (r.status === 200) {
                    //The request was successful.
                    setLastPhase(phase);
                    setPhase(2);
                } else {
                    //The request was unsuccessful.
                    setLastPhase(phase);
                    setPhase(3);
                }
            });

            setLastPhase(phase);
            setPhase(1);
        }

        setInputValidityState(staging_input_validity_state);
    };

    const handleUpdateEmailAttemptAction = () => {
        const staging_input_validity_state =
            /^[A-z0-9\._-]+@[A-z0-9]+\.[A-z0-9]+$/.test(email.trim());

        if (staging_input_validity_state === true) {
            //The input passed the validity test, so we run the update
            //fetch request.
            const post_payload = {
                id: data._id,
                email: email.trim(),
            };

            console.log(post_payload);

            //Construct the POST request.
            const backend_api_endpoint = import.meta.env
                .VITE_BACKEND_API_ENDPOINT;
            const fetch_url = `${backend_api_endpoint}/api/reservations/update/email`;

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
                if (r.status === 200) {
                    //The request was successful.
                    setLastPhase(phase);
                    setPhase(2);
                } else {
                    //The request was unsuccessful.
                    setLastPhase(phase);
                    setPhase(3);
                }
            });

            setLastPhase(phase);
            setPhase(1);
        }

        setInputValidityState(staging_input_validity_state);
    };

    const handleUpdateDateAttemptAction = () => {
        const staging_input_validity_state =
            /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}$/.test(date.trim());

        if (staging_input_validity_state === true) {
            //The input passed the validity test, so we run the update
            //fetch request.
            const post_payload = {
                id: data._id,
                date: parseISO(date.trim()).getTime(),
            };

            console.log(post_payload);

            //Construct the POST request.
            const backend_api_endpoint = import.meta.env
                .VITE_BACKEND_API_ENDPOINT;
            const fetch_url = `${backend_api_endpoint}/api/reservations/update/date`;

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
                if (r.status === 200) {
                    //The request was successful.
                    setLastPhase(phase);
                    setPhase(2);
                } else {
                    //The request was unsuccessful.
                    setLastPhase(phase);
                    setPhase(3);
                }
            });

            setLastPhase(phase);
            setPhase(1);
        }

        setInputValidityState(staging_input_validity_state);
    };

    const handleUpdateNotesAttemptAction = () => {
        const staging_input_validity_state = /^.{0,255}$/.test(notes.trim());

        if (staging_input_validity_state === true) {
            //The input passed the validity test, so we run the update
            //fetch request.
            const post_payload = {
                id: data._id,
                notes: notes.trim(),
            };

            console.log(post_payload);

            //Construct the POST request.
            const backend_api_endpoint = import.meta.env
                .VITE_BACKEND_API_ENDPOINT;
            const fetch_url = `${backend_api_endpoint}/api/reservations/update/notes`;

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
                if (r.status === 200) {
                    //The request was successful.
                    setLastPhase(phase);
                    setPhase(2);
                } else {
                    //The request was unsuccessful.
                    setLastPhase(phase);
                    setPhase(3);
                }
            });

            setLastPhase(phase);
            setPhase(1);
        }

        setInputValidityState(staging_input_validity_state);
    };

    const handleDeleteAttemptAction = () => {
        const post_payload = {
            id: data._id,
        };

        console.log(post_payload);

        //Construct the POST request.
        const backend_api_endpoint = import.meta.env.VITE_BACKEND_API_ENDPOINT;
        const fetch_url = `${backend_api_endpoint}/api/reservations/delete`;

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
            if (r.status === 200) {
                //The request was successful.
                setLastPhase(phase);
                setPhase(5);
            } else {
                //The request was unsuccessful.
                setLastPhase(phase);
                setPhase(6);
            }
        });

        setLastPhase(phase);
        setPhase(1);
    };

    /**
     * TODO:
     * Now that the API routes are created, hook everything up to the
     * backend.
     *
     * The reservations have a "deleted" status flag, which indicates
     * that these should not be rendered normally. ALthough, maybe
     * we could make it so that the get requests filter these results
     * out by default, then allow a method to fetch these reservations.
     */

    if (isShown === true) {
        return (
            <Modal onClick={hideModal}>
                <div className="w-full h-full flex flex-col-reverse flex-nowrap items-center md:justify-center">
                    <div
                        className="modal-reservation-card-wrapper overflow-hidden bg-slate-50 w-full shadow-[0_-3px_3px_0_rgba(0,0,0,0.1)] md:w-[30rem] md:flex md:flex-col md:flex-nowrap md:shadow-[1px_3px_3px_0_rgba(0,0,0,0.2)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex">
                            <button
                                className="poppins-light text-xs px-4 py-2 bg-slate-100"
                                onClick={() => handleContextualBackAction()}
                            >
                                <BackIcon />
                            </button>
                        </div>
                        {/** CONTENT PHASE WRAPPER*/}
                        <div className="flex-1 flex flex-nowrap overflow-x-hidden w-full h-[460px] md:h-[505px]">
                            {/** Phase 0 -> Menu*/}
                            <div
                                className={`overflow-x-hidden h-full ${
                                    phase <= 0
                                        ? last_phase < 0
                                            ? 'w-full'
                                            : 'animate-width-transition-open'
                                        : 'animate-width-transition-close'
                                }`}
                                //className={`overflow-x-hidden h-full ${
                                //    phase <= 0
                                //        ? `animate-width-transition-open`
                                //        : 'animate-width-transition-close'
                                //}`}
                            >
                                {/** Modal Header */}
                                <div className="p-4 pt-0 md:p-8 md:pt-0">
                                    <div className="poppins-light uppercase text-xs text-center">
                                        {status}
                                    </div>
                                    <div className="text-3xl flex gap-2 justify-center my-1 text-center">
                                        <span className="capitalize">
                                            {first_name}
                                        </span>
                                        <span className="capitalize">
                                            {last_name}
                                        </span>
                                    </div>
                                    <div className="text-xs text-center">
                                        {email}
                                    </div>
                                    <div className="text-xs text-center">
                                        {phonenumber}
                                    </div>
                                    <div className="text-sm text-center">
                                        {notes}
                                    </div>
                                </div>
                                {/** Modal Content */}
                                <div className="flex flex-col flex-nowrap gap-2 p-4 border-t-2 text-xs md:p-8">
                                    <button
                                        className="bg-slate-100 p-2 poppins-light"
                                        onClick={() =>
                                            handlePhaseTransitionAction(10)
                                        }
                                    >
                                        Change first name
                                    </button>
                                    <button
                                        className="bg-slate-100 p-2 poppins-light"
                                        onClick={() =>
                                            handlePhaseTransitionAction(11)
                                        }
                                    >
                                        Change last name
                                    </button>
                                    <button
                                        className="bg-slate-100 p-2 poppins-light"
                                        onClick={() =>
                                            handlePhaseTransitionAction(13)
                                        }
                                    >
                                        Change email
                                    </button>
                                    <button
                                        className="bg-slate-100 p-2 poppins-light"
                                        onClick={() =>
                                            handlePhaseTransitionAction(12)
                                        }
                                    >
                                        Change phone number
                                    </button>
                                    <button
                                        className="bg-slate-100 p-2 poppins-light"
                                        onClick={() =>
                                            handlePhaseTransitionAction(15)
                                        }
                                    >
                                        Change notes
                                    </button>
                                    <button className="bg-slate-100 p-2 poppins-light">
                                        Change seats
                                    </button>
                                    <button
                                        className="bg-slate-100 p-2 poppins-light"
                                        onClick={() =>
                                            handlePhaseTransitionAction(14)
                                        }
                                    >
                                        Change date
                                    </button>
                                    <button
                                        className="bg-red-700 text-neutral-50 p-2 poppins-light"
                                        onClick={() =>
                                            handlePhaseTransitionAction(4)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {/** Phase 10 -> Change FirstName Form*/}
                            {phase === 10 || last_phase === 10 ? (
                                <div
                                    className={`overflow-x-hidden ${
                                        last_phase === 10
                                            ? 'animate-width-transition-close'
                                            : phase === 10
                                            ? 'animate-width-transition-open'
                                            : 'w-0'
                                    }`}
                                >
                                    <div className="p-4 md:px-8">
                                        <h3 className="text-3xl my-4">
                                            Change First Name
                                        </h3>
                                        <input
                                            className={`w-full p-2 border ${
                                                input_is_valid !== null &&
                                                input_is_valid === false
                                                    ? 'border-red-500'
                                                    : 'mb-2'
                                            }`}
                                            type="text"
                                            placeholder="John"
                                            id="reservation-firstname-input"
                                            name="reservation-firstname"
                                            value={first_name}
                                            onChange={(e) =>
                                                setFirstName(
                                                    e.target.value.trim()
                                                )
                                            }
                                        />
                                        <div
                                            className={`mb-2 text-xs poppins-light text-red-500 text-right ${
                                                input_is_valid !== null &&
                                                input_is_valid === false
                                                    ? 'block'
                                                    : 'hidden'
                                            }`}
                                        >
                                            <div>At least 3 characters.</div>
                                            <div>
                                                Letters only. Hyphens allowed.
                                            </div>
                                        </div>
                                        <button
                                            className="bg-emerald-700 text-neutral-50 poppins-light text-xs px-4 py-2 mt-4"
                                            onClick={() =>
                                                handleUpdateFirstNameAttemptAction()
                                            }
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            ) : null}

                            {/** Phase 11 -> Change LastName Form*/}
                            {phase === 11 || last_phase === 11 ? (
                                <div
                                    className={`overflow-x-hidden ${
                                        last_phase === 11
                                            ? 'animate-width-transition-close'
                                            : phase === 11
                                            ? 'animate-width-transition-open'
                                            : 'max-w-0'
                                    }`}
                                >
                                    <div className="p-4 md:px-8">
                                        <h3 className="text-3xl my-4">
                                            Change Last Name
                                        </h3>
                                        <input
                                            className={`w-full p-2 border ${
                                                input_is_valid !== null &&
                                                input_is_valid === false
                                                    ? 'border-red-500'
                                                    : 'mb-2'
                                            }`}
                                            type="text"
                                            placeholder="Doe"
                                            id="reservation-lastname-input"
                                            name="reservation-lastname"
                                            value={last_name}
                                            onChange={(e) =>
                                                setLastName(
                                                    e.target.value.trim()
                                                )
                                            }
                                        />
                                        <div
                                            className={`mb-2 text-xs poppins-light text-red-500 text-right ${
                                                input_is_valid !== null &&
                                                input_is_valid === false
                                                    ? 'block'
                                                    : 'hidden'
                                            }`}
                                        >
                                            <div>At least 3 characters.</div>
                                            <div>
                                                Letters only. Hyphens allowed.
                                            </div>
                                        </div>
                                        <button
                                            className="bg-emerald-700 text-neutral-50 poppins-light text-xs px-4 py-2 mt-4"
                                            onClick={() =>
                                                handleUpdateLastNameAttemptAction()
                                            }
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            ) : null}

                            {/** Phase 12 -> Change Phone Number Form*/}
                            {phase === 12 || last_phase === 12 ? (
                                <div
                                    className={`overflow-x-hidden ${
                                        last_phase === 12
                                            ? 'animate-width-transition-close'
                                            : phase === 12
                                            ? 'animate-width-transition-open'
                                            : 'w-0'
                                    }`}
                                >
                                    <div className="p-4 md:px-8">
                                        <h3 className="text-3xl my-4">
                                            Change Phone Number
                                        </h3>
                                        <input
                                            className={`w-full p-2 border ${
                                                input_is_valid !== null &&
                                                input_is_valid === false
                                                    ? 'border-red-500'
                                                    : 'mb-2'
                                            }`}
                                            type="text"
                                            placeholder="18005671234"
                                            id="reservation-phonenumber-input"
                                            name="reservation-phonenumber"
                                            value={phonenumber}
                                            onChange={(e) =>
                                                setPhoneNumber(
                                                    e.target.value.trim()
                                                )
                                            }
                                        />
                                        <div
                                            className={`mb-2 text-xs poppins-light text-red-500 text-right ${
                                                input_is_valid !== null &&
                                                input_is_valid === false
                                                    ? 'block'
                                                    : 'hidden'
                                            }`}
                                        >
                                            <div>
                                                Minimum 11 digits. Maximum 13.
                                            </div>
                                            <div>Digits only.</div>
                                        </div>
                                        <button
                                            className="bg-emerald-700 text-neutral-50 poppins-light text-xs px-4 py-2 mt-4"
                                            onClick={() =>
                                                handleUpdatePhoneNumberAttemptAction()
                                            }
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            ) : null}

                            {/** Phase 13 -> Change Email Form*/}
                            {phase === 13 || last_phase === 13 ? (
                                <div
                                    className={`overflow-x-hidden ${
                                        last_phase === 13
                                            ? 'animate-width-transition-close'
                                            : phase === 13
                                            ? 'animate-width-transition-open'
                                            : 'w-0'
                                    }`}
                                >
                                    <div className="p-4 md:px-8">
                                        <h3 className="text-3xl my-4">
                                            Change Email
                                        </h3>
                                        <input
                                            className={`w-full p-2 border ${
                                                input_is_valid !== null &&
                                                input_is_valid === false
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
                                                input_is_valid === false
                                                    ? 'block'
                                                    : 'hidden'
                                            }`}
                                        >
                                            <div>
                                                Must be a valid email format.
                                            </div>
                                        </div>
                                        <button
                                            className="bg-emerald-700 text-neutral-50 poppins-light text-xs px-4 py-2 mt-4"
                                            onClick={() =>
                                                handleUpdateEmailAttemptAction()
                                            }
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            ) : null}

                            {/** Phase 14 -> Change Date Form*/}
                            {phase === 14 || last_phase === 14 ? (
                                <div
                                    className={`overflow-x-hidden ${
                                        last_phase === 14
                                            ? 'animate-width-transition-close'
                                            : phase === 14
                                            ? 'animate-width-transition-open'
                                            : 'w-0'
                                    }`}
                                >
                                    <div className="p-4 md:px-8">
                                        <h3 className="text-3xl my-4">
                                            Change Date / Time
                                        </h3>
                                        <input
                                            className={`w-full p-2 border ${
                                                input_is_valid !== null &&
                                                input_is_valid === false
                                                    ? 'border-red-500'
                                                    : 'mb-2'
                                            }`}
                                            type="datetime-local"
                                            id="reservation-datetime-input"
                                            name="reservation-datetime"
                                            value={date}
                                            onChange={(e) =>
                                                setDate(e.target.value.trim())
                                            }
                                        />
                                        <div
                                            className={`mb-2 text-xs poppins-light text-red-500 text-right ${
                                                input_is_valid !== null &&
                                                input_is_valid === false
                                                    ? 'block'
                                                    : 'hidden'
                                            }`}
                                        >
                                            <div>Must be a valid datetime.</div>
                                        </div>
                                        <button
                                            className="bg-emerald-700 text-neutral-50 poppins-light text-xs px-4 py-2 mt-4"
                                            onClick={() =>
                                                handleUpdateDateAttemptAction()
                                            }
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            ) : null}

                            {/** Phase 15 -> Change Notes Form*/}
                            {phase === 15 || last_phase === 15 ? (
                                <div
                                    className={`overflow-x-hidden ${
                                        last_phase === 15
                                            ? 'animate-width-transition-close'
                                            : phase === 15
                                            ? 'animate-width-transition-open'
                                            : 'w-0'
                                    }`}
                                >
                                    <div className="p-4 md:px-8">
                                        <h3 className="text-3xl my-4">
                                            Change Notes
                                        </h3>
                                        <textarea
                                            className={`w-full p-2 border ${
                                                input_is_valid !== null &&
                                                input_is_valid === false
                                                    ? 'border-red-500'
                                                    : 'mb-2'
                                            }`}
                                            name="reservation-notes"
                                            id="reservation-notes-textarea"
                                            placeholder="Special Client, Bottle Service, VIP..."
                                            value={notes}
                                            onChange={(e) =>
                                                setNotes(e.target.value)
                                            }
                                        ></textarea>
                                        <div
                                            className={`mb-2 text-xs poppins-light text-red-500 text-right ${
                                                input_is_valid !== null &&
                                                input_is_valid === false
                                                    ? 'block'
                                                    : 'hidden'
                                            }`}
                                        >
                                            <div>Must be a valid datetime.</div>
                                        </div>
                                        <button
                                            className="bg-emerald-700 text-neutral-50 poppins-light text-xs px-4 py-2 mt-4"
                                            onClick={() =>
                                                handleUpdateNotesAttemptAction()
                                            }
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            ) : null}

                            {/** Phase 1 -> Loading Screen*/}
                            {phase === 1 || last_phase === 1 ? (
                                <div
                                    className={`overflow-x-hidden ${
                                        last_phase === 1
                                            ? 'animate-width-transition-close'
                                            : phase === 1
                                            ? 'animate-width-transition-open'
                                            : 'w-0'
                                    }`}
                                >
                                    <div className="flex justify-center items-center fill-slate-200 p-4 h-full md:px-8">
                                        <div>
                                            <Spinner />
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            {/** Phase 2 -> Update Success*/}
                            {phase === 2 || last_phase === 2 ? (
                                <div
                                    className={`overflow-x-hidden ${
                                        last_phase === 2
                                            ? 'animate-width-transition-close'
                                            : phase === 2
                                            ? 'animate-width-transition-open'
                                            : 'w-0'
                                    }`}
                                >
                                    <div className="flex flex-col justify-center items-center fill-slate-200 p-4 h-full md:px-8">
                                        <h3 className="text-4xl text-center poppins-light">
                                            Success
                                        </h3>
                                        <div className="mt-1 poppins-light text-center">
                                            The reservation was updated
                                            successfully.
                                        </div>
                                        <button
                                            className="bg-neutral-200 poppins-light text-xs px-4 py-2 mt-8"
                                            onClick={() => {
                                                setVisibility(false);
                                                refreshReservations();
                                            }}
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            ) : null}

                            {/** Phase 3 -> Update Fail*/}
                            {last_phase === 3 || phase === 3 ? (
                                <div
                                    className={`overflow-x-hidden ${
                                        last_phase === 3
                                            ? 'animate-width-transition-close'
                                            : phase === 3
                                            ? 'animate-width-transition-open'
                                            : 'w-0'
                                    }`}
                                >
                                    <div className="flex flex-col justify-center items-center fill-slate-200 p-4 h-full md:px-8">
                                        <h3 className="text-4xl text-center poppins-light">
                                            Error
                                        </h3>
                                        <div className="mt-1 poppins-light text-center">
                                            There was a problem updating the
                                            reservation.
                                        </div>
                                        <button
                                            className="bg-neutral-200 poppins-light text-xs px-4 py-2 mt-8"
                                            onClick={() => {
                                                setVisibility(false);
                                                refreshReservations();
                                            }}
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            ) : null}

                            {/** Phase 4 -> Delete Confirm*/}
                            {phase === 4 || last_phase === 4 ? (
                                <div
                                    className={`overflow-x-hidden ${
                                        last_phase === 4
                                            ? 'animate-width-transition-close'
                                            : phase === 4
                                            ? 'animate-width-transition-open'
                                            : 'w-0'
                                    }`}
                                >
                                    <div className="flex flex-col justify-center items-center fill-slate-200 p-4 h-full md:px-8">
                                        <h3 className="text-4xl text-center poppins-light">
                                            Confirm Delete Action
                                        </h3>
                                        <div className="mt-1 poppins-light text-center">
                                            <div>
                                                Are you sure you want to delete
                                                this reservation?
                                            </div>
                                            <div>
                                                This action cannot be undone.
                                            </div>
                                        </div>
                                        <button
                                            className="bg-red-700 text-neutral-50 poppins-light text-xs px-4 py-2 mt-8"
                                            onClick={() =>
                                                handleDeleteAttemptAction()
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ) : null}

                            {/** Phase 5 -> Delete Success*/}
                            {phase === 5 || last_phase === 5 ? (
                                <div
                                    className={`overflow-x-hidden ${
                                        last_phase === 5
                                            ? 'animate-width-transition-close'
                                            : phase === 5
                                            ? 'animate-width-transition-open'
                                            : 'w-0'
                                    }`}
                                >
                                    <div className="flex flex-col justify-center items-center fill-slate-200 p-4 h-full md:px-8">
                                        <h3 className="text-4xl text-center poppins-light">
                                            Success
                                        </h3>
                                        <div className="mt-1 poppins-light text-center">
                                            The reservation was delete
                                            successfully.
                                        </div>
                                        <button
                                            className="bg-neutral-200 poppins-light text-xs px-4 py-2 mt-8"
                                            onClick={() => {
                                                setVisibility(false);
                                                refreshReservations();
                                            }}
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            ) : null}

                            {/** Phase 6 -> Delete Fail*/}
                            {phase === 6 || last_phase === 6 ? (
                                <div
                                    className={`overflow-x-hidden ${
                                        last_phase === 6
                                            ? 'animate-width-transition-close'
                                            : phase === 6
                                            ? 'animate-width-transition-open'
                                            : 'w-0'
                                    }`}
                                >
                                    <div className="flex flex-col justify-center items-center fill-slate-200 p-4 h-full md:px-8">
                                        <h3 className="text-4xl text-center poppins-light">
                                            Error
                                        </h3>
                                        <div className="mt-1 poppins-light text-center">
                                            There was a problem deleting the
                                            reservation.
                                        </div>
                                        <button
                                            className="bg-neutral-200 poppins-light text-xs px-4 py-2 mt-8"
                                            onClick={() => {
                                                setVisibility(false);
                                                refreshReservations();
                                            }}
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }

    //If the modal is not visible, don't render anything.
    return null;
}
