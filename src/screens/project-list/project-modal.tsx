import React from "react";
import { Button, Drawer } from "antd";
import {
  projectListAcitons,
  selectProjectModalOpen,
} from "./project-list.slice";
import { useDispatch, useSelector } from "react-redux";
export const ProjectModal = () => {
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectModalOpen);
  return (
    <Drawer
      onClose={() => dispatch(projectListAcitons.closeProjectModal())}
      visible={projectModalOpen}
      width={"100%"}
    >
      <h1> ProjectModal</h1>
      <Button onClick={() => dispatch(projectListAcitons.closeProjectModal())}>
        关闭
      </Button>
    </Drawer>
  );
};
