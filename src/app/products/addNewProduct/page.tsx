"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/utils/api";

const Page = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      rating: 0,
      price: 0,
      category: "",
      brand: "",
    },
  });

  const backButton = () => {
    router.push("/");
  };

  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  const onSubmit = (data) => {
    addProductMutation.mutate(data);
    router.push("/");
  };

  return (
    <div className="container p-4">
      <div className="flex gap-6">
        <Button type="button" variant="outline" onClick={backButton}>
          Back
        </Button>
        <h1 className="mb-4 text-2xl font-bold">Add New Product</h1>
      </div>
      <form className="max-w-2xl space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="title" className="block">
              Title
            </label>
            <Input id="title" {...register("title")} />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="brand" className="block">
              Brand
            </label>
            <Input id="brand" {...register("brand")} />
            {errors.brand && (
              <p className="text-sm text-red-500">{errors.brand.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="price" className="block">
              Price ($)
            </label>
            <Input
              id="price"
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="rating" className="block">
              Rating (0-5)
            </label>
            <Input
              id="rating"
              type="number"
              step="0.1"
              max="5"
              {...register("rating", { valueAsNumber: true })}
            />
            {errors.rating && (
              <p className="text-sm text-red-500">{errors.rating.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="block">
              Category
            </label>
            <Input id="category" {...register("category")} />
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="submit">Add Product</Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
