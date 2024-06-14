import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
`;

const Title = styled.h1`
    font-size: 2rem;
    color: #FFFFFF;
    text-align: center;
`;

const FormContainer = styled.form`
    width: 340px;
    height: 100%;
    max-height: 300px;
    padding: 10px;
    background-color: rgba(255,255,255,0.3);
    border: 2px solid white;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const InputArea = styled.div`
    width: 260px;
    display: flex;
    flex-direction: column;
    align-items: start;
`;

const Input = styled.input`
    width: 100%;
    height: 35px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    font-size: 1rem;
    
`;

const DescArea = styled.textarea`
    width: 100%;
    height: 80px;
    min-height: 45px;
    max-height: 98px;
    padding: 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    font-size: 1rem;
    resize: vertical;
    margin-bottom: 10px;
`;

const Label = styled.label`
    color: white;
    margin: 5px 0;
`;

const Button = styled.button`
    height: 35px;
    width: 100px;
    padding-top: 1px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #233e54;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    color: white;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    margin-bottom: 10px;
`;


const Form = ({ onEdit, setOnEdit, getTasks }) => {
    const ref = useRef();
    const [description, setDescription] = useState("");

    useEffect(() => {
        if(onEdit) {
            const task = ref.current
            task.taskName.value = onEdit.taskName
            setDescription(onEdit.description);
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const task = ref.current;
    
        if (
          !task.taskName.value 
        ) {
          return toast.warn("Preencha o nome da tarefa!");
        }

        const taskData = {
            taskName: task.taskName.value,
            description: description, 
        };
    
        if (onEdit) {
          await axios
            .put(`http://localhost:8080/todolist/a3/tasks/${onEdit.id}`, taskData)
            .then(({ data }) => toast.success("Tarefa atualizada com sucesso!"))
            .catch(({ data }) => toast.error("Ocorreu um erro :("));
        } else {
          await axios
            .post("http://localhost:8080/todolist/a3/tasks", taskData)
            .then(({ data }) => toast.success("Tarefa criada com sucesso!"))
            .catch(({ data }) => toast.error("Ocorreu um erro :("));
        }
    
        task.taskName.value = "";
        setDescription("");
    
        setOnEdit(null);
        getTasks();
      };



    return (
        <Container>
            <Title>To-Do List v.A-3</Title>
            <FormContainer ref={ref} onSubmit={handleSubmit}>
                <InputArea>
                    <Label>Tarefa:</Label>
                    <Input name="taskName" />
                    <Label>Descrição:</Label>
                    <DescArea value={description} onChange={(e) => setDescription(e.target.value)} />
                </InputArea>
                <Button type="submit">Salvar</Button>
            </FormContainer>
        </Container>
    )
}

export default Form;