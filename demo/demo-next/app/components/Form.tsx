"use client";

import { useState } from "react";
import { TextBlockProps } from "./TextBlock";

interface ComponentForm {
  setProps: (props: any) => void;
}

const Form = (props: TextBlockProps & ComponentForm) => {
  const [limit, setLimit] = useState(props.limit);

  return (
    <>
      <form
        className="p-5 flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const limit = formData.get("limit") as string;
          props.setProps({ limit: limit });
        }}
      >
        <div>
          <input
            type="number"
            name="limit"
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
            className="bg-white p-2 rounded-lg border border-gray-300"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
