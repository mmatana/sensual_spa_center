import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

class GeneralModal extends React.Component {
    state = {
      show: false
    }

    componentDidUpdate(prevProps) {
      const { appointment } = this.props;

      if (prevProps.appointment.message !== appointment.message) {
        if (appointment.message === 'Appointment Updated') {
          this.setState({ show: false });
        }
      }
    }

    render() {
      const { classes, buttonText, title, children, btnClasses } = this.props;
      return (
        <div className={classes}>
          <Button variant="info" style={{ cursor: 'pointer' }} className={btnClasses} onClick={() => this.setState({ show: true })}>
            {buttonText}
          </Button>
          <Modal size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered show={this.state.show} onHide={() => this.setState({ show: false })}>
            <Modal.Header closeButton >
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
          </Modal>
        </div>
      );
    }
}

const mapStateToProps = state => {
  return {
    appointment: state.appointment
  };
};

export default connect(mapStateToProps, {})(GeneralModal);
