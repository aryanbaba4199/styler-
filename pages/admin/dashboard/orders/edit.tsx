import { useState } from 'react';

const EditOrderModal = ({ isOpen, onClose, onSubmit, formData, isLoading } : any) => {
  const [editedStatus, setEditedStatus] = useState(formData.status);

  const handleKeyDown = (e : any) => {
    if (e.key === 'Enter') {
      // Update the status when the 'Enter' key is pressed
      onSubmit({ ...formData, status: editedStatus });
    }
  };

  const handleStatusChange = (e : any) => {
    // Update the edited status immediately on any keyboard input
    setEditedStatus(e.target.value);
  };

  return (
    <div className='mt-5'>
      <h2 className='text-blue-800 font-semibold text-center'>Admin Panel</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className='text-red-700'>
            Is Paid:
            <input
              type="checkbox"
              checked={formData.isPaid}
              onChange={(e) => onSubmit({ ...formData, isPaid: e.target.checked })}
            />
          </label>
        </div>
        <div>
          <label>
            Status :---
            <input
              type="text"
              className='bg-orange-100 rounded-md p-1 text-lime-600'
              value={editedStatus}
              onKeyDown={handleKeyDown}
              onChange={handleStatusChange}
            />
          </label>
        </div>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EditOrderModal;
