import { useArray, useMount } from "utils";
import React from "react";

export const TsReactTest = () => {
  const persons: { name: string; age: number }[] = [
    { name: "jack", age: 25 },
    { name: "aas", age: 22 },
  ];
  const { value, clear, removeIndex, add } = useArray(persons);

  useMount(() => {
    // console.log(value.notExist);
    // add({name:"david"});
    // removeIndex("123");
  });

  return (
    <div>
      <button onClick={() => add({ name: "tom", age: 55 })}> add</button>
      <button onClick={() => removeIndex(0)}> removeIndex0</button>
      <button onClick={() => clear()}> clear</button>
      {value.map((person, index) => (
        <div key={index + person.name}>
          <span>{index}</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))}
    </div>
  );
};
