// Fetch Products
const url = "https://dummyjson.com/products";

export interface Product {
  id: number;
  name: string;
  price: number;
}

// export const fetchProducts = async (): Promise<Product[]> => {
//   try {
//     const response = await fetch(`${url}?limit=${10}&skip=${0}`);
//     if (!response.ok) {
//       throw new Error(`Error fetching products`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Failed to fetch products:", error);
//   }
// }

// export const fetchProducts = async ({
//   limit,
//   skip,
// }: {
//   limit: number;
//   skip: number;
// }): Promise<{ products: Product[]; total: number }> => {
//   try {
//     const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
//     if (!response.ok) {
//       throw new Error("Error fetching products");
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Failed to fetch products:", error);
//     throw error;
//   }
// };

// utils/api.ts

export const fetchProducts = async ({
  limit,
  skip,
  sortBy,
  sortOrder,
}: {
  limit: number;
  skip: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}): Promise<{ products: Product[]; total: number }> => {
  const sortParam = sortBy ? `&sort=${sortBy}` : "";
  const orderParam = sortOrder ? `&order=${sortOrder}` : "";

  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}${sortParam}${orderParam}`
  );

  if (!response.ok) throw new Error("Error fetching products");

  return await response.json();
};



export const deleteProductItem = async (id: number | string): Promise<void> => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method:"DELETE",
     
    })
    if(!response.ok) {
      throw new Error(`Error deleting product with id ${id}`);
    } 
    return response.json();
  } catch(err){
    console.error(`Failed to delete product with id ${id}:`, err);
  }
}

export const fetchProductById = async (id: number | string): Promise<Product> => {
  try {
    const response = await fetch(`${url}/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching product with id ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch product with id ${id}:`, error);}


  }

  export const updateProductById = async (id: number | string, data: Partial<Product>): Promise<Product> => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error updating product with id ${id}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Failed to update product with id ${id}:`, error);
    }
  }

  export const createProduct = async (data: Partial<Product>): Promise<Product> => {
    try {
      const response = await fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Error creating product");
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  }