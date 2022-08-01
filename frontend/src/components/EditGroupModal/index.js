// frontend/src/components/EditGroupModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditGroup from './EditGroup';

function EditGroupModal({ group }) {
  const [showModal, setShowModal] = useState(false);
  // function that returns setShwoMOdalfalse and pass as prop
  const closeModal = (bool) => setShowModal(bool);
  return (
    <>
      <button className='group-btn' onClick={() => setShowModal(true)}>Edit Group</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditGroup group={group} closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default EditGroupModal;
