import React from 'react';

interface SkeletonProps {
  style?: React.CSSProperties;
}

const styles = {
  skeletonBar: {
    backgroundColor: 'gray-200',
    animation: 'pulse',
    borderRadius: 'rounded-lg',
  },
  skeletonContainer: {
    display: 'flex',
    gap: '3',
    padding: '5',
  },
  skeletonBarContainer: {
    width: '1/2',
    display: 'flex',
    flexDirection: 'column',
    gap: '3',
  },
  skeletonBarSmall: {
    height: '5',
  },
};

const SkeletonBar = (props: SkeletonProps) => {
  return <div style={props.style}></div>;
}

export const Skeleton = () => {
  return (
    <div style={styles.skeletonContainer}>
      <div style={{
        width: '1/2',
        display: 'flex',
        flexDirection: 'column',
        gap: '3',
      }}>
        <SkeletonBar style={{
          width: '50%'
        }} />
        <SkeletonBar style={styles.skeletonBarSmall} />
        <SkeletonBar style={styles.skeletonBarSmall} />
        <SkeletonBar style={styles.skeletonBarSmall} />
      </div>
    </div>
  );
};
