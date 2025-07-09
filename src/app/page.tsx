"use client";

import { useCart } from "@/context/CartContext";
import { wixClient } from "@/lib/wixClient";
import ProductList from "@/components/ProductList";
import { useEffect, useState } from "react";

export default function Page() {
  const [products, setProducts] = useState([]);
  const { updateCartCount } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      const res = await wixClient.products.queryProducts().find();
      setProducts(
        res.items.map((item) => ({
          _id: item._id,
          name: item.name,
          image: item.media?.mainMedia?.image?.url || "/placeholder.png",
        }))
      );
    }

    async function fetchPortfolioProjects() {
      const res = await wixClient.items
        .query("PortfolioProjects")
        .limit(100)
        .find();
      console.log("PortfolioProjects", res.items);
    }

    fetchProducts();
    fetchPortfolioProjects();
  }, []);

  async function handleAddToCart(productId: string) {
    const response = await wixClient.currentCart.addToCurrentCart({
      lineItems: [
        {
          quantity: 1,
          catalogReference: {
            catalogItemId: productId,
            appId: "1397d0be-5dfd-47d5-90a3-3027fc0f396e",
          },
        },
      ],
    });

    console.log("Cart returned from addToCurrentCart:", response);

    await updateCartCount();
  }

  return (
    <main className="p-6">
      <ProductList products={products} onAddToCart={handleAddToCart} />
    </main>
  );
}
