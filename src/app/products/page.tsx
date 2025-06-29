"use client";

import Navbar from "@/components/navbar";
import { fetchProducts } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/table/data-table";
import { useState } from "react";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const skip = (page - 1) * limit;

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", page], // page included for re-fetching
    queryFn: () => fetchProducts({ limit, skip }),
    keepPreviousData: true,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
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
      />
    </main>
  );
}
