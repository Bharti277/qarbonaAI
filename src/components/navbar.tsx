import React from "react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const addNewProduct = () => {
    router.push("/products/addNewProduct");
  };

  return (
    <div className="flex items-center justify-between border-b p-4">
      <div className="ml-auto flex items-center space-x-4">
        <Button
          onClick={addNewProduct}
          variant="default"
          className="cursor-pointer"
        >
          Add Product
        </Button>

        <ModeToggle />
      </div>
    </div>
  );
}
