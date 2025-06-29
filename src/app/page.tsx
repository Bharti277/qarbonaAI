"use client";

import Navbar from "@/components/navbar";
import { fetchProducts } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/table/data-table";

export default function HomePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
  });
  console.log("Products:", data, isLoading, error);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">Error fetching products</div>;
  }

  return (
    <main className="min-h-screen overflow-auto">
      <Navbar />
      <DataTable data={data?.products} />
    </main>
  );
}
