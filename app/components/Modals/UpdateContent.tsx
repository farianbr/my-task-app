"use client";

import React, { useEffect, useState } from "react";
import Button from "../Button/Button";

import { close, edit } from "@/app/utils/Icons";
import styled from "styled-components";
import { useGlobalState } from "@/app/context/globalProviders";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const UpdateContent = ({ id }: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);
  const router = useRouter();
  const { theme, allTasks } = useGlobalState();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/api/tasks/${id}`);
        const { title, description, date, isCompleted, isImportant } = res.data;

        setTitle(title);
        setDescription(description);
        setDate(date);
        setCompleted(isCompleted);
        setImportant(isImportant);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleChange = (name: string) => (e: any) => {
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "completed":
        setCompleted(e.target.checked);
        break;
      case "important":
        setImportant(e.target.checked);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const task = {
      title,
      description,
      date,
      completed,
      important,
    };

    try {
      await axios.put(`/api/tasks/${id}`, task);
      toast.success("Task updated");
      allTasks();
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <UpdateContentStyled onSubmit={handleSubmit} theme={theme}>
      <h1 className="flex flex-row justify-between">
        Update a Task{" "}
        <button
          onClick={() => router.push("/")}
          type="button"
          className="close-btn py-1 px-4 rounded-md"
        >
          {close}
        </button>
      </h1>

      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          name="title"
          onChange={handleChange("title")}
          placeholder="..."
        />
      </div>
      <div className="input-control">
        <label htmlFor="description">Description</label>
        <textarea
          value={description}
          onChange={handleChange("description")}
          name="description"
          id="description"
          rows={4}
          placeholder="..."
        ></textarea>
      </div>
      <div className="input-control">
        <label htmlFor="date">Deadline</label>
        <input
          value={date}
          onChange={handleChange("date")}
          type="date"
          name="date"
          id="date"
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="completed">Toggle Completed</label>
        <input
          value={completed.toString()}
          onChange={handleChange("completed")}
          type="checkbox"
          name="completed"
          id="completed"
          checked={completed}
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="important">Toggle Important</label>
        <input
          value={important.toString()}
          onChange={handleChange("important")}
          type="checkbox"
          name="important"
          id="important"
          checked={important}
        />
      </div>

      <div className="submit-btn flex justify-end">
        <Button
          type="submit"
          name="Update Task"
          icon={edit}
          padding={"0.8rem 2rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1.2rem"}
          background={"rgb(0, 163, 255)"}
        />
      </div>
    </UpdateContentStyled>
  );
};

const UpdateContentStyled = styled.form`
  position: relative;
  padding: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  height: 100%;
  overflow-y: auto;

  .close-btn:hover {
    transition: all 0.3s ease;
    background-color: ${(props) => props.theme.colorGrey5};
    color: ${(props) => props.theme.colorGrey0};
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }

  color: ${(props) => props.theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 1.6rem 0;
    font-weight: 500;

    @media screen and (max-width: 450px) {
      margin: 1rem 0;
    }

    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);

      span {
        color: ${(props) => props.theme.colorGrey3};
      }
    }

    input,
    textarea {
      width: 100%;
      padding: 1rem;

      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
      border-radius: 0.5rem;
    }
  }

  .submit-btn button {
    transition: all 0.35s ease-in-out;

    @media screen and (max-width: 500px) {
      font-size: 0.9rem !important;
      padding: 0.6rem 1rem !important;

      i {
        font-size: 1.2rem !important;
        margin-right: 0.5rem !important;
      }
    }

    i {
      color: ${(props) => props.theme.colorGrey0};
    }

    &:hover {
      background: ${(props) => props.theme.colorPrimaryGreen} !important;
      color: ${(props) => props.theme.colorWhite} !important;
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
`;

export default UpdateContent;
