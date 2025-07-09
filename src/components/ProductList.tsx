import { Product } from "@/types";

type ProductListProps = {
  products: Product[];
  onAddToCart: (productId: string) => void;
};

export default function ProductList({
  products,
  onAddToCart,
}: ProductListProps) {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {products.map((product) => (
        <li
          key={product._id}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <div className="flex flex-1 flex-col p-8">
            <img
              alt={product.name}
              src={product.image}
              className="mx-auto size-32 shrink-0 rounded-full"
            />
            <h3 className="mt-6 text-sm font-medium text-gray-900">
              {product.name}
            </h3>
          </div>
          <div className="p-4">
            <button
              onClick={() => onAddToCart(product._id as string)}
              className="w-full rounded bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700 transition"
            >
              Add to Cart
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
