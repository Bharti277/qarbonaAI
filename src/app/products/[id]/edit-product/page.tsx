"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchProductById } from "@/utils/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { updateProductById } from "@/utils/api";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  // const formData = useState({
  //   title: data?.title || "",
  //   rating: data?.rating || "",
  //   price: data?.price || "",
  //   category: data?.category || "",
  //   brand: data?.brand || "",
  // });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      rating: 0,
      price: 0,
      category: "",
      brand: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        rating: data.rating,
        price: data.price,
        category: data.category,
        brand: data.brand,
      });
    }
  }, [data, reset]);

  const backToProducts = () => {
    router.push("/");
  };

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ id, values }) => updateProductById(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      router.push("/");
    },
    onError: (err) => {
      console.error("Update failed:", err);
      alert("Update failed");
    },
  });

  const onSubmit = (values) => {
    console.log(values, "values");

    updateMutation.mutate({ id, values });
  };

  return (
    <>
      <div className="container p-4">
        <Button
          variant="default"
          onClick={backToProducts}
          className="cursor-pointer bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          Back
        </Button>
        <form
          className="mt-4 rounded-lg border p-6 shadow-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="title" className="block">
                Title
              </label>
              <Input id="title" {...register("title")} />
            </div>
            <div className="space-y-2">
              <label htmlFor="rating" className="block">
                Rating
              </label>
              <Input id="rating" {...register("rating")} />
            </div>
            <div className="space-y-2">
              <label htmlFor="price" className="block">
                Price
              </label>
              <Input id="price" {...register("price")} />
            </div>
            <div className="space-y-2">
              <label htmlFor="category" className="block">
                Category
              </label>
              <Input id="category" {...register("category")} />
            </div>
            <div className="space-y-2">
              <label htmlFor="brand" className="block">
                Brand
              </label>
              <Input id="brand" {...register("brand")} />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="default"
              className="cursor-pointer bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Page;
