import BackIcon from './BackIcon';
import Modal from './Modal';

export default function ReservationModal({ isShown, setVisibility, data }) {
    const {
        firstName,
        lastName,
        tableId,
        status,
        notes,
        date,
        phoneNumber,
        email,
    } = data;

    function hideModal(e) {
        setVisibility(false);
    }

    if (isShown === true) {
        return (
            <Modal onClick={hideModal}>
                <div className="w-full h-full flex flex-col-reverse flex-nowrap items-center md:justify-center">
                    <div className="modal-reservation-card-wrapper overflow-hidden bg-slate-50 w-full shadow-[0_-3px_3px_0_rgba(0,0,0,0.1)] md:w-[37rem] md:flex md:flex-col md:flex-nowrap md:shadow-[1px_3px_3px_0_rgba(0,0,0,0.2)]">
                        <div className="">
                            <button
                                className="poppins-light text-xs px-4 py-2 bg-slate-100"
                                onClick={hideModal}
                            >
                                <BackIcon />
                            </button>
                        </div>
                        {/** Modal Header */}
                        <div className="p-4 pt-0 md:p-8 md:pt-0">
                            <div className="poppins-light uppercase text-xs text-center">
                                {status}
                            </div>
                            <div className="text-3xl flex gap-2 justify-center my-1 text-center">
                                <span>{firstName}</span>
                                <span>{lastName}</span>
                            </div>
                            <div className="text-xs text-center">{email}</div>
                            <div className="text-xs text-center">
                                {phoneNumber}
                            </div>
                            <div className="text-sm text-center">{notes}</div>
                        </div>
                        {/** Modal Content */}
                        <div className="flex flex-col flex-nowrap gap-2 p-4 border-t-2 text-xs md:p-8">
                            <button className="bg-slate-100 p-2 poppins-light">
                                Change first name
                            </button>
                            <button className="bg-slate-100 p-2 poppins-light">
                                Change last name
                            </button>
                            <button className="bg-slate-100 p-2 poppins-light">
                                Change email
                            </button>
                            <button className="bg-slate-100 p-2 poppins-light">
                                Change phone number
                            </button>
                            <button className="bg-slate-100 p-2 poppins-light">
                                Change notes
                            </button>
                            <button className="bg-slate-100 p-2 poppins-light">
                                Change status
                            </button>
                            <button className="bg-slate-100 p-2 poppins-light">
                                Change date
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }

    //If the modal is not visible, don't render anything.
    return null;
}
