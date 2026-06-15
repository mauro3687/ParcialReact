const ConfirmDeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Eliminar post</h3>
        <p>Esta acción no se puede deshacer.</p>
        <div className="modal__actions">
          <button className="btn-line" onClick={onCancel}>Cancelar</button>
          <button className="btn-del" onClick={onConfirm}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
