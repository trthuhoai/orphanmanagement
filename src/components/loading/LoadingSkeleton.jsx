import React from "react";
import "./_skeleton.scss";

const LoadingSkeleton = ({ className = "" }) => {
    return (
        <div
            className={`skeleton ${className}`}
            style={{ width: 16, height: 16 }}
        ></div>
    );
};

export const LoadingList = () => {
    return (
        <tbody>
            {Array(5)
                .fill(0)
                .map((item, index) => (
                    <tr>
                        <td className="d-flex align-items-center gap-3">
                            <LoadingSkeleton className="rounded-circle d-inline-block"></LoadingSkeleton>
                            <LoadingSkeleton className="my-3 d-inline-block w-75"></LoadingSkeleton>
                        </td>

                        <td>
                            <LoadingSkeleton className="my-3 w-100"></LoadingSkeleton>
                        </td>
                        <td>
                            <LoadingSkeleton className="my-3 w-100"></LoadingSkeleton>
                        </td>
                        <td>
                            <LoadingSkeleton className="rounded-circle d-inline-block"></LoadingSkeleton>
                            <LoadingSkeleton className="rounded-circle d-inline-block"></LoadingSkeleton>
                            <LoadingSkeleton className="rounded-circle d-inline-block"></LoadingSkeleton>
                        </td>
                    </tr>
                ))}
        </tbody>
    );
};

export default LoadingSkeleton;
