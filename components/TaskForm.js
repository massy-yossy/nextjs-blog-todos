import { useContext } from "react";
import Cookie from "universal-cookie";
import { StateContext } from "../context/StateContext";

export default function TaskForm({ taskCreated }) {
  const cookie = new Cookie();
  const { selectedTask, setSelectedTask } = useContext(StateContext);

  const create = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/`, {
      method: "POST",
      body: JSON.stringify({ title: selectedTask.title }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access_token")}`,
      },
    }).then((res) => {
      if (res === 401) {
        alert("JWT token not");
      }
    });
    setSelectedTask({ id: 0, title: "" });
    taskCreated(); //更新用
  };
  const update = async (e) => {
    e.preventDefault();
    await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${selectedTask.id}/`,
      {
        method: "PUT",
        body: JSON.stringify({ title: selectedTask.title }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookie.get("access_token")}`,
        },
      }
    ).then((res) => {
      if (res === 401) {
        alert("JWT token not");
      }
    });
    setSelectedTask({ id: 0, title: "" });
    taskCreated(); //更新
  };

  return (
    <form onSubmit={selectedTask.id !== 0 ? update : create}>
      <input
        className="text-black mb-8 px-2 py-1"
        type="text"
        value={selectedTask.title}
        onChange={(e) =>
          setSelectedTask({ ...selectedTask, title: e.target.value })
        }
      />
      <button
        className="bg-gray-500 ml-2 hover:bg-gray-600 text-sm px-2 py-1 rounded uppercase"
        type="submit"
      >
        {selectedTask.id !== 0 ? "update" : "create"}
      </button>
    </form>
  );
}
