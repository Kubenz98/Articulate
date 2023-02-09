import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface UserProps {
  loading: boolean;
}

const LoadingUserSkeleton = ({ loading }: UserProps) => {
  return (
    <SkeletonTheme baseColor="#252525" highlightColor="#363636">
      <div>
        <Skeleton height={107} />
      </div>
    </SkeletonTheme>
  );
};

export default LoadingUserSkeleton;
