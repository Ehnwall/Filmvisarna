import { Button, Modal } from 'react-bootstrap'
import { CONFIRMDELETEMODALPROPS } from '@/utils/types/types'

const modalForDeleteBooking = ({ show, onHide, onConfirm }: CONFIRMDELETEMODALPROPS) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Bekräfta avbokning</Modal.Title>
            </Modal.Header>
            <Modal.Body>Är du säker på att du vill avboka denna bokning?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Avbryt
                </Button>
                <Button variant="outline-danger" onClick={onConfirm}>
                    Ja, avboka
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default modalForDeleteBooking
