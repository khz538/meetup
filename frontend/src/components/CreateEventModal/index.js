// frontend/src/components/CreateEventModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateEvent from './CreateEvent';

function CreateEventModal({ group }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create an Event</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateEvent group={group} />
        </Modal>
      )}
    </>
  );
}

export default CreateEventModal;