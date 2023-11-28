import React from "react";

interface SkeletonProps {
  style?: React.CSSProperties;
}

const SkeletonBar = (props: SkeletonProps) => {
  return <div style={props.style}></div>;
};

export const Skeleton = () => {
  return (
    <div
      className="animate-pulse"
      style={{
        animationName: "pulse",
        animationDuration: "1s",
        animationIterationCount: "infinite",
        display: "flex",
        gap: "12px",
      }}
    >
      <SkeletonBar
        style={{
          width: "50%",
          backgroundColor: "#D3D3D3",
          borderRadius: "0.5rem",
        }}
      />
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <SkeletonBar
          style={{
            height: "1rem",
            backgroundColor: "#D3D3D3",
            borderRadius: "0.25rem",
          }}
        />
        <SkeletonBar
          style={{
            height: "1rem",
            backgroundColor: "#D3D3D3",
            borderRadius: "0.25rem",
          }}
        />
        <SkeletonBar
          style={{
            height: "1rem",
            backgroundColor: "#D3D3D3",
            borderRadius: "0.25rem",
          }}
        />
      </div>
    </div>
  );
};
