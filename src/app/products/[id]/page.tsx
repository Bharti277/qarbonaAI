"use client";

import { Button } from "@/components/ui/button";
import { fetchProductById, fetchProducts } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => {
      if (typeof id !== "string" && typeof id !== "number") {
        throw new Error("Invalid product id");
      }
      return fetchProductById(id);
    },
  });

  useEffect(() => {
    // console.log("Product Data:", data);

    if (data?.brand) {
      document.title = `${data.brand} – MyShop`;
    }
  }, [data?.brand]);

  const backToProducts = () => {
    router.push("/products");
  };
  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }
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

        <div className="mt-4 rounded-lg border p-6 shadow-lg">
          <div>
            <div className="flex items-center justify-between text-center">
              <h1 className="text-3xl font-bold">{data?.title}</h1>
              <div className="mt-2 flex items-center">
                <span className="text-black">Rating :</span>
                <span className="ml-1">{data?.rating}/5</span>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="mt-2">{data?.description}</p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-500">Brand</span>
                <div>{data?.brand}</div>
              </div>
              <div>
                <span className="text-gray-500">Category</span>
                <div>{data?.category}</div>
              </div>
              <div>
                <span className="text-gray-500">Price</span>
                <div>{data?.price.toFixed(2)}₹</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
