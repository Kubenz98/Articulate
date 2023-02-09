import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface PostProps {
  loading: boolean;
}

const LoadingSkeleton = ({ loading }: PostProps) => {
  return (
    <SkeletonTheme baseColor="#252525" highlightColor="#363636">
        <div>
            <Skeleton height={15} />
            <Skeleton height={200} />
            <Skeleton height={30} />
            <Skeleton height={20} />
            <Skeleton height={20} />
        </div>
    </SkeletonTheme>
  );
}

export default LoadingSkeleton;
