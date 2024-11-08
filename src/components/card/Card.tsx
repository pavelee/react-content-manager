import React, { ReactNode } from "react";

interface CardProps {
  title: string;
  description?: string;
  actions: ReactNode[];
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  const { title, description, actions } = props;
  return (
    <div
      style={{
        border: "1px solid #f0f0f0",
        borderRadius: "2px",
        padding: "16px",
        marginBottom: "16px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
      }}
    >
      <div
        style={{
          fontSize: "16px",
          fontWeight: "500",
          marginBottom: "8px",
        }}
      >
        {title}
      </div>
      {description && (
        <div
          style={{
            color: "#8c8c8c",
            marginBottom: "16px",
          }}
        >
          {description}
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {actions.map((action, index) => (
          <div key={index} style={{ marginLeft: "8px" }}>
            {action}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
