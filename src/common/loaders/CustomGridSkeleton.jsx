import { Skeleton } from "antd";
import React from "react";

const CustomGridSkeleton = ({ rows }) => {
  return (
    <div className="w-100 px-3 loading-container-grid">
      {[...Array(rows || 2).keys()].map((item) => {
        return <Skeleton.Input size="large" active className={` w-100 mb-1`} />;
      })}
    </div>
  );
};

export default CustomGridSkeleton;
