// frontend/src/components/EditGroupModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditGroup from './EditGroup';

function EditGroupModal({ group }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Group</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditGroup group={group} />
        </Modal>
      )}
    </>
  );
}

export default EditGroupModal;