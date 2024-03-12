import { Skeleton } from "antd";
import React from "react";

const CustomGridSkeleton = ({ rows, columns }) => {
  return (
    <div className="w-100 px-3 loading-container-grid">
      <div>
        <Skeleton.Input size="large" className="w-100 mb-1" />
      </div>
      {[...Array(rows || 2).keys()].map((item) => {
        return (
          <div className="d-flex overflow-hidden">
            {[...Array(columns || 2).keys()].map(() => {
              return (
                <Skeleton.Input
                  size="large"
                  active
                  className={` w-100 mb-1 me-3`}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default CustomGridSkeleton;
