export default function Modal({ children, onClick }) {
    function handleClickWithoutBubbling(event) {
        event.stopPropagation();
        onClick(event);
    }

    return (
        <div
            onClick={handleClickWithoutBubbling}
            className="modal-wrapper fixed top-0 left-0 h-screen w-screen z-20"
        >
            {children}
        </div>
    );
}
