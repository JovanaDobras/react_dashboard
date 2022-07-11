import { useGlobalHook, AuthContext } from '../context';
import "./Modal.css";

function ModalDelete({ closeModalDelete, id }) {
  
  const { url } = useGlobalHook(AuthContext);

  const Delete = () => {
    fetch(`${url}/${id}`, {
      method: "DELETE",
    }).then(() => {
      window.location.reload(false);
      console.log(`${url}/${id}`);
    });
  };

  return (
    <div className="delete">
      <div className="delete-center">
        <div className="popup">
          <p>Are you sure you want to delete</p>
          <h2>Lorem Ipsum</h2>
          <div className="btn-delete">
            <a href="#">
              <input type="button" onClick={Delete} className="delete-input" value="Yes"/>
            </a>
            <div className="delete-no log-out-btn">
              <a href="#">
                <input onClick={() => closeModalDelete(false)} type="button" className="delete-input" value="No"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDelete;
