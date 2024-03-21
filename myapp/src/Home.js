import React, { useState } from "react";
import "./App.css";
import Modal from "react-modal";

const ModalContent = ({ Addmodule }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  function handletitle(event) {
    const titlevalue = event.target.value;
    setTitle(titlevalue);
  }

  function handlepriority(event) {
    const Priorityvalue = event.target.value;
    setPriority(Priorityvalue);
  }

  function handleStatus(event) {
    const Statusvalue = event.target.value;
    setStatus(Statusvalue);
  }

  function Transfer() {
    if (title && priority && status) {
      setTitle("");
      setPriority("");
      setStatus("");
      Addmodule({ title, priority, status });
    }
  }

  return (
    <div className="modelcontent">
      <h2 style={{ color: "white" }}>Enter Data</h2>

      <input
        className="input"
        type="text"
        placeholder="Add Title..."
        onChange={handletitle}
      />
      <select name="" id="" onChange={handlepriority}>
        <option value="Priority" hidden>
          Priority
        </option>
        <option value="High">High</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
      </select>
      <select name="" id="" onChange={handleStatus}>
        <option value="Status" hidden>
          Status
        </option>
        <option value="Done">Done</option>
        <option value="Inprogress">Inprogress</option>
        <option value="Lagging">Lagging</option>
      </select>

      <button style={{ backgroundColor: "lightgreen" }} onClick={Transfer}>
        Add
      </button>
    </div>
  );
};

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [Tasks, setTasks] = useState([]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const Addmodule = (newItem) => {
    setTasks([...Tasks, newItem]);
    setModalIsOpen(false);
  };

  const deleteItem = (index) => {
    const newItems = [...Tasks];
    newItems.splice(index, 1);
    setTasks(newItems);
  };

  return (
    <div>
      <div className="content">
        <h1>TO DO LIST</h1>
        <button onClick={openModal} className="homebtn">
          Add Tasks
        </button>
      </div>

      <div className="outmap">
        {Tasks.map((Task, index) => (
          <div className="map" key={index}>
            <p>
              <h4>Title</h4> {Task.title}
            </p>
            <p>
              <h4>Priority</h4>
              {Task.priority}
            </p>
            <p>
              <h4>Status</h4> {Task.status}
            </p>
            <button onClick={() => deleteItem(index)}>Delete</button>
          </div>
        ))}
      </div>
      <Modal
        className="model"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <ModalContent Addmodule={Addmodule} />
      </Modal>
    </div>
  );
}
