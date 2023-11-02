import React from 'react';

interface SkeletonProps {
  className?: string;
}

const SkeletonBar = (props: SkeletonProps) => {
  return <div className={`bg-gray-200 animate-pulse rounded-lg ${props.className}`}></div>;
}

export const Skeleton = () => {
  return (
    <div className="flex gap-3 p-5">
      <SkeletonBar className="w-1/2" />
      <div className="w-1/2 flex flex-col gap-3">
        <SkeletonBar className="h-5" />
        <SkeletonBar className="h-5" />
        <SkeletonBar className="h-5" />
      </div>
    </div>
  );
};
