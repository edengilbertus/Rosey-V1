import React, { useState } from 'react';
import { Product } from '../../types';
import { ProductForm } from './ProductForm';

interface ProductListProps {
  products: Product[];
  onProductUpdate: (product: Product) => void;
  onProductDelete: (productId: number) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  onProductUpdate,
  onProductDelete 
}) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDelete = (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onProductDelete(productId);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleSaveEdit = (updatedProduct: Product) => {
    onProductUpdate(updatedProduct);
    setEditingProduct(null);
  };

  if (editingProduct) {
    return (
      <ProductForm 
        product={editingProduct}
        onProductUpdate={handleSaveEdit}
        onCancel={handleCancelEdit}
        existingProducts={products}
      />
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-brand-charcoal">
          Products
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Manage your product catalog
        </p>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {products.map((product) => (
            <li key={product.id}>
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {product.imageUrls && product.imageUrls.length > 0 && (
                      <img 
                        src={product.imageUrls[0]} 
                        alt={product.name} 
                        className="h-16 w-16 object-cover rounded-md"
                      />
                    )}
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-brand-charcoal">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEdit(product)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-brand-charcoal bg-brand-yellow hover:bg-brand-tan focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-tan"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    {product.description}
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Images: {product.imageUrls.length}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};