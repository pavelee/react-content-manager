"use client";

import { useState } from "react";
import { useCMConfig } from "react-content-manager/dist/esm/client/useCMConfig";
import { TextBlockProps } from "./Component";
import { useRouter } from "next/navigation";

interface ComponentForm {
  configId: string;
  componentId: string;
}

const Form = (props: TextBlockProps & ComponentForm) => {
  const router = useRouter();
  const { saveChange, isSaving } = useCMConfig();
  const [limit, setLimit] = useState(props.limit);

  return (
    <>
      <form
        className="p-5 flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const limit = formData.get("limit") as string;
          await saveChange(
            props.configId,
            props.componentId,
            {
              limit: limit,
            },
            () => {
              router.refresh();
            },
          );
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
