import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table
  width: 340px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  border: 2px solid white;
  border-radius: 20px;
;

const Tr = styled.tr
  color: white;
;

const Th = styled.th
  text-align: start;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  padding: 5px;
  font-size: 1.34rem;
;

const Td = styled.td
  padding: 15px 0 5px;
  font-size: 1.2rem;
;

const Grid = ({ tasks, setTasks, setOnEdit }) => {
  const handleEdit = (item) => setOnEdit(item);

  const handleDelete = async (id) => {
    try {
      await axios.delete(http://localhost:8080/todolist/a3/tasks/${id});
      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast.success("Tarefa excluída com sucesso!");
    } catch {
      toast.error("Ocorreu um erro :(");
    }
    setOnEdit(null);
  };

  return (
    <Table>
      <thead>
        <Tr>
          <Th>Tarefas</Th>
          <Th colSpan="2"></Th>
        </Tr>
      </thead>
      <tbody>
        {tasks.length === 0 ? (
          <Tr>
            <Td colSpan="3" style={{ textAlign: "center", fontSize: "1rem" }}>
              Nenhuma tarefa encontrada.
            </Td>
          </Tr>
        ) : (
          tasks.map((item, i) => (
            <Tr key={i}>
              <Td width="30%">
                • {item.taskName}
                <br />
                <small>{item.description}</small>
              </Td>
              <Td align="center" width="5%">
                <FaEdit onClick={() => handleEdit(item)} />
              </Td>
              <Td align="center" width="5%">
                <FaTrash onClick={() => handleDelete(item.id)} />
              </Td>
            </Tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default Grid;
