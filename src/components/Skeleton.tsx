import React from "react";

type SrOnlyProps = {
  children: React.ReactNode;
};

const SrOnlyComponent = (props: SrOnlyProps) => {
  return (
    <div
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0,0,0,0)",
        whiteSpace: "nowrap",
        border: "0",
      }}
    >
      {props.children}
    </div>
  );
};

const SkeletonBlock = () => {
  return (
    <div
      role="status"
      style={{
        padding: "1rem",
        border: "1px solid #E5E7EB",
        borderRadius: "0.375rem",
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        animation: "pulse 2s infinite",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "12rem",
          marginBottom: "1rem",
          backgroundColor: "#D1D5DB",
          borderRadius: "0.375rem",
        }}
      >
        <svg
          style={{
            width: "2.5rem",
            height: "2.5rem",
            color: "#E5E7EB",
          }}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 20"
        >
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
        </svg>
      </div>
      <div
        style={{
          height: "0.625rem",
          backgroundColor: "#E5E7EB",
          borderRadius: "9999px",
          width: "12rem",
          marginBottom: "1rem",
        }}
      ></div>
      <div
        style={{
          height: "0.5rem",
          backgroundColor: "#E5E7EB",
          borderRadius: "9999px",
          marginBottom: "0.625rem",
        }}
      ></div>
      <div
        style={{
          height: "0.5rem",
          backgroundColor: "#E5E7EB",
          borderRadius: "9999px",
          marginBottom: "0.625rem",
        }}
      ></div>
      <div
        style={{
          height: "0.5rem",
          backgroundColor: "#E5E7EB",
          borderRadius: "9999px",
        }}
      ></div>
      <div style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
        <svg
          style={{
            width: "2.5rem",
            height: "2.5rem",
            marginRight: "0.75rem",
            color: "#E5E7EB",
          }}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        <div>
          <div
            style={{
              height: "0.625rem",
              backgroundColor: "#E5E7EB",
              borderRadius: "9999px",
              width: "8rem",
              marginBottom: "0.5rem",
            }}
          ></div>
          <div
            style={{
              width: "12rem",
              height: "0.5rem",
              backgroundColor: "#E5E7EB",
              borderRadius: "9999px",
            }}
          ></div>
        </div>
      </div>
      <SrOnlyComponent>Loading...</SrOnlyComponent>
    </div>
  );
};

export const Skeleton = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <SkeletonBlock />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
        }}
      >
        <SkeletonBlock />
        <SkeletonBlock />
        <SkeletonBlock />
      </div>
    </div>
  );
};
