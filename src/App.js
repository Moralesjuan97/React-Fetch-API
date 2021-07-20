import React, { useEffect, useState } from "react";

export const App = () => {
  const [task, setTask] = useState("");
  const [list, setList] = useState([{ label: "", done: false }]);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleAdd = (event) => {
    if (task.length > 2) {
      setList(list.concat({ label: task, done: false }));
    } else {
      alert("task must contain more than two letters");
    }
    setTask("");
    event.preventDefault();
  };

  const handleDelete = (id) => {
    const newList = list.filter((task, index) => index !== id);
    setList(newList);
  };

  const deleteList = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/juanm", {
      method: "DELETE",
      body: JSON.stringify([]),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
      })
      .then((data) => {
        setList([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateList = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/juanm", {
      method: "PUT",
      body: JSON.stringify(list),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return response.json;
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getList = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/juanm")
      .then((res) => res.json())
      .then((data) => setList(data));
  };

  const createList = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/juanm", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify([{ label: "", done: false }]),
    })
      .then((response) => {
        console.log(response);
      })
      .then((data) => {
        setList([{ label: "create tasks like this one!", done: false }]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    updateList();
  }, [list]);

  useEffect(() => {
    getList();
  }, []);

  //createList()

  return (
    <div className="container">
      <form onSubmit={handleAdd}>
        <input
          value={task}
          type="text"
          placeholder="Add to-do"
          onChange={handleChange}
        />
      </form>
      {list.length > 0 ? (
        <ul>
          {list.map((task, index) => (
            <li key={index}>
              {task.label}
              <button onClick={() => handleDelete(index)}>X</button>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p>No new tasks</p>
          <button type="submit" onClick={createList}>
            Create list
          </button>
        </div>
      )}
      <p> {list.length} to be completed</p>
      <button onClick={deleteList}>Delete All</button>
    </div>
  );
};
export default App;
