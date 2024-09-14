import { cn } from "@bem-react/classname";
import { Modal, ModalProps } from "antd";
import { AnimatePresence } from "framer-motion";
import { toggleModal } from "store/reducers/TodoSlice";

import { useAppDispatch, useAppSelector } from "shared/hooks/redux";

import TodoList from "../TodoList";

import "./TodoModal.scss";

const cnTodoModal = cn("todoModal");

const TodoModal = (props: ModalProps) => {
  const { modalIsOpen } = useAppSelector((state) => state.todoReducer);
  const dispatch = useAppDispatch();

  const handleOk = () => {
    dispatch(toggleModal());
  };

  const handleCancel = () => {
    dispatch(toggleModal());
  };

  return (
    <AnimatePresence initial={false} mode={"wait"}>
      {modalIsOpen && (
        <Modal
          {...props}
          open
          footer={null}
          title={"Basic Modal"}
          className={cnTodoModal()}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <TodoList />
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default TodoModal;
