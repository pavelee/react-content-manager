"use client";

import { useState } from "react";
import { useCMConfig } from "react-content-manager/dist/esm/client/useCMConfig";
import { ComponentProps } from "./Component";
import { useRouter } from "next/navigation";

interface ComponentForm {
  configId: string;
  componentId: string;
}

const Form = (props: ComponentProps & ComponentForm) => {
  const router = useRouter();
  const { saveChange, isSaving } = useCMConfig();
  const [limit, setLimit] = useState(props.text);

  return (
    <>
      <form
        className="p-5 flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const text = formData.get("text") as string;
          await saveChange(
            props.configId,
            props.componentId,
            {
              text: text,
            },
            () => {
              router.refresh();
            },
          );
        }}
      >
        <div>
          <input
            type="text"
            name="text"
            defaultValue={props.text}
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
