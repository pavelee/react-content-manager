"use client";

import { useState } from "react";

interface ComponentForm {
  setProps: (props: any) => void;
}

const Form = (props: any) => {
  return (
    <>
      <div className="bg-black p-5">
        <div>Hello!</div>
      </div>
    </>
  );
};

export default Form;
