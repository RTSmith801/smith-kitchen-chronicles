import Modal from "./Modal";
import classes from "./ConfirmModal.module.css";

const ConfirmModal = ({ recipeName, message, onConfirm, onCancel }) => {
    return (
        <Modal onClose={onCancel}>
            <div className={classes.confirmModal}>
                <h1>{recipeName}</h1>
                <p>{message}</p>
                <div className={classes.actions}>
                    <button onClick={onCancel}>Cancel</button>
                    <button className={classes.danger} onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
