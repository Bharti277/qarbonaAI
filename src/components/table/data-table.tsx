"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useReactTable } from "@tanstack/react-table";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ChevronLeft, ChevronRight, Edit, Trash } from "lucide-react";
import { deleteProductItem } from "@/utils/api";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface FilterOption {
  columnId: string;
  title: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

interface DataTableProps<TData, TValue> {
  columns?: ColumnDef<TData, TValue>[];
  data: TData[];
  filters?: FilterOption[];
  page: number;
  limit: number;
  total: number;
  handlePageChange: (page: number) => void;
  handleSortChange: (sortBy?: string, sortOrder?: "asc" | "desc") => void;
  currentSort: { sortBy?: string; sortOrder?: "asc" | "desc" };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filters,
  handlePageChange,
  handleSortChange,
  limit,
  page,
  currentSort,
  total,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const queryClient = useQueryClient();
  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number | string) => deleteProductItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleRowProductItem = (id: number) => {
    router.push(`/products/${id}`);
    console.log("Row clicked with ID:", id);
  };

  const handleEditProductById = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/products/${id}/edit-product`);
  };

  React.useEffect(() => {
    document.title = "All Products – MyShop";
  }, []);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-4">
      {/* <DataTableToolbar table={table} filters={filters} /> */}
      <div className="max-h-screen rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableHead className="w-[100px]">Title</TableHead>
               */}
              <TableHead
                className="cursor-pointer"
                onClick={() => {
                  const isAsc =
                    currentSort.sortBy === "title" &&
                    currentSort.sortOrder === "asc";
                  handleSortChange("title", isAsc ? "desc" : "asc");
                }}
              >
                Title
                {currentSort.sortBy === "title" && (
                  <span className="ml-1">
                    {currentSort.sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </TableHead>

              <TableHead>Brand</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((product) => (
              <TableRow
                key={product.id}
                className="cursor-pointer"
                onClick={() => handleRowProductItem(product.id)}
              >
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">{product.price}</TableCell>
                <TableCell className="text-right">{product.rating}/5</TableCell>
                <TableCell className="text-right">
                  <div
                    className="flex items-center justify-end space-x-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Edit
                      onClick={(e) => handleEditProductById(product.id, e)}
                    />
                    <Trash onClick={() => deleteMutation.mutate(product.id)} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* <DataTablePagination table={table} /> */}
      <div className="mt-4 flex items-center justify-between">
        <div></div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="text-sm">
            Page {page} of {totalPages}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
//
