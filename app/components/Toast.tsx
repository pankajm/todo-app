import { ToastContainer } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";

interface Props {
  show: boolean;
  onClose: () => void;
  variant: string;
}

const Notify = ({ show, onClose, variant }: Props) => {
  return (
    <ToastContainer className="p-3" position="bottom-end" style={{ zIndex: 1 }}>
      <Toast show={show} onClose={onClose} bg={variant} delay={4000} autohide>
        <Toast.Header>
          <strong className="me-auto text-md">Something went wrong !</strong>
        </Toast.Header>
        <Toast.Body className="bg-white">
          Something is not right at the moment. Please try after sometime.
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Notify;
