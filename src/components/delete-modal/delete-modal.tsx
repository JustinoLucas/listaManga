import React from "react";
import './delete-modal.css'

interface DeleteModalProps {
  closeModal: () => void;
  confirmDelete: () => void;
  mangaName: string | null; 
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  closeModal,
  confirmDelete,
  mangaName
}) => {
  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal">
        <h2>Confirmação</h2>
        <p>Você tem certeza que deseja excluir <b>{mangaName}</b>?</p>
        <div className="delete-modal-buttons">
          <button onClick={confirmDelete} className="confirm-button">
            Confirmar
          </button>
          <button onClick={closeModal} className="cancel-button">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};