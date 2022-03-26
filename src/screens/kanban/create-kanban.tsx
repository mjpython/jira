import React, { useState } from "react";
import { useAddKanban } from "utils/kanban";
import { useKanbanQueryKey, useProjectIdInUrl } from "./util";
import { Input } from "antd";
import { Container } from "./kanban-column";
function CreateKanban() {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addKanban } = useAddKanban(useKanbanQueryKey());
  const submit = async () => {
    await addKanban({ name, projectId });
    setName("");
  };
  return (
    <Container>
      {/* //从kanban-column引入的，需先把kanban-column中的导出 */}
      <Input
        size={"large"}
        placeholder="新建看板名称"
        onPressEnter={submit}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Container>
  );
}

export default CreateKanban;
