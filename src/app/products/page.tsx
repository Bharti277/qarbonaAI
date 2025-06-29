"use client";

import Navbar from "@/components/navbar";
import { fetchProducts } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/table/data-table";
import { useState } from "react";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sorting, setSorting] = useState<{
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }>({});

  const skip = (page - 1) * limit;

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", page, sorting],
    queryFn: () =>
      fetchProducts({
        limit,
        skip,
        sortBy: sorting.sortBy,
        sortOrder: sorting.sortOrder,
      }),
    keepPreviousData: true,
  });

  const handlePageChange = (newPage: number) => setPage(newPage);

  const handleSortChange = (sortBy?: string, sortOrder?: "asc" | "desc") => {
    setSorting({ sortBy, sortOrder });
    setPage(1);
  };

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">Error fetching products</div>;

  return (
    <main className="min-h-screen overflow-auto">
      <Navbar />
      <DataTable
        data={data?.products ?? []}
        total={data?.total ?? 0}
        page={page}
        limit={limit}
        handlePageChange={handlePageChange}
        handleSortChange={handleSortChange}
        currentSort={sorting}
      />
    </main>
  );
}
