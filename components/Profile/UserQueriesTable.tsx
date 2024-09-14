import React, { useState } from "react";
import { formatDate, formatTime } from "@/lib/utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import { queryTrackingType } from "@/lib/types";
import { Slider } from "../ui/slider";
import Pagination, { PageState } from "@/lib/utils/Pagination";

interface UserQueriesTableProps {
  userId: string | undefined;
}

const UserQueriesTable: React.FC<UserQueriesTableProps> = ({ userId }) => {
  const [pageState, setPageState] = useState<PageState>({
    count: 0,
    skip: 0,
    take: 10,
  });
  const getQueries = async () => {
    const res = await fetch(
      `/api/QueryTracking/${userId}?skip=${pageState.skip}&take=${pageState.take}`
    );
    const data = await res.json();
    setPageState({
      skip: pageState.skip,
      take: pageState.take,
      count: data.count,
    });
    return data.queries;
  };

  const { data, isLoading, isSuccess, refetch } = useQuery<queryTrackingType[]>(
    {
      queryKey: ["query", pageState.skip],
      queryFn: getQueries,
      refetchOnReconnect: true,
    }
  );

  return (
    <>
      <div className="overflow-auto">
        <table className="min-w-full w-full mt-4">
          <thead>
            <tr className="border-t border-gray-200 dark:border-gray-800">
              <th>Sl.No</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Review</th>
              <th>Created At</th>
              <th>Created Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {isLoading && <div className="text-center pt-4">Loading...</div>}
            {!isLoading &&
              isSuccess &&
              data &&
              data?.map((query, index) => (
                <tr key={query.id} className="bg-gray-50 dark:bg-gray-800">
                  <td className="px-4 py-3 text-sm">{index + 1}</td>
                  <td className="px-4 py-3 text-sm">{query.subject}</td>
                  <td className="px-4 py-3 text-sm">{query.queryStatus}</td>
                  <td>
                    <Slider defaultValue={[3]} max={5} step={1} min={1} />
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {formatDate(query.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {formatTime(query.createdAt)}
                  </td>
                </tr>
              ))}
          </tbody>
          <Pagination pageState={pageState} onPageChange={setPageState} />
        </table>
      </div>
    </>
  );
};

export default UserQueriesTable;
