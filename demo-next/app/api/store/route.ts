import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { StoreInterface } from "@/app/_store/StoreInterface";
import { LocalFileStore } from "@/app/_store/file/LocalFileStore";

const store: StoreInterface = new LocalFileStore("./app/_store/file/data.json");

export const GET = async (request: NextRequest) => {
  const configId = request.nextUrl.searchParams.get("configId");

  if (!configId) {
    // return 400 response
    return new NextResponse(
      JSON.stringify({
        error: "configId is required",
      }),
      {
        status: 400,
      },
    );
  }

  // read the data from the store
  const data = await store.getFromStore(configId);

  return NextResponse.json(data);
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const configId = body.configId;
  const data = body.data;
  const componentId = body.componentId;

  if (!configId) {
    // return 400 response
    return new NextResponse(
      JSON.stringify({
        error: "configId is required",
      }),
      {
        status: 400,
      },
    );
  }

  if (!componentId) {
    // return 400 response
    return new NextResponse(
      JSON.stringify({
        error: "componentId is required",
      }),
      {
        status: 400,
      },
    );
  }

  if (!data) {
    // return 400 response
    return new NextResponse(
      JSON.stringify({
        error: "data key in body is required",
      }),
      {
        status: 400,
      },
    );
  }

  // write the data to the store
  store.putInStore(configId, componentId, data);

  return NextResponse.json({});
};
