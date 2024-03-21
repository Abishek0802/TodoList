import React, { useState } from "react";
import "./App.css";
import Modal from "react-modal";

const ModalContent = ({ Addmodule, editIndex, tasks }) => {
  const [title, setTitle] = useState(tasks[editIndex]?.title || "");
  const [priority, setPriority] = useState(tasks[editIndex]?.priority || "");
  const [status, setStatus] = useState(tasks[editIndex]?.status || "");

  function handletitle(event) {
    setTitle(event.target.value);
  }

  function handlepriority(event) {
    setPriority(event.target.value);
  }

  function handleStatus(event) {
    setStatus(event.target.value);
  }

  function Transfer() {
    if (title && priority && status) {
      Addmodule({ title, priority, status }, editIndex);
    }
  }

  return (
    <div className="modelcontent">
      <h2 style={{ color: "white" }}>Add Data</h2>

      <input
        className="input"
        type="text"
        placeholder="Edit Title..."
        value={title}
        onChange={handletitle}
      />
      <select value={priority} onChange={handlepriority}>
        <option value="" hidden>
          Priority
        </option>
        <option value="High">High</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
      </select>
      <select value={status} onChange={handleStatus}>
        <option value="" hidden>
          Status
        </option>
        <option value="Done">Done</option>
        <option value="Inprogress">Inprogress</option>
        <option value="Lagging">Lagging</option>
      </select>

      <button style={{ backgroundColor: "lightgreen" }} onClick={Transfer}>
        Submit
      </button>
    </div>
  );
};

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [Tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const openModal = (index) => {
    setEditIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const Addmodule = (newItem, index) => {
    const updatedTasks = [...Tasks];
    if (index !== undefined && index !== null) {
      updatedTasks[index] = newItem;
    } else {
      updatedTasks.push(newItem);
    }
    setTasks(updatedTasks);
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
        <button onClick={() => openModal(null)} className="homebtn">
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
            <button className="update" onClick={() => openModal(index)}>
              Edit
            </button>
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
        <ModalContent
          Addmodule={Addmodule}
          editIndex={editIndex}
          tasks={Tasks}
        />
      </Modal>
    </div>
  );
}
