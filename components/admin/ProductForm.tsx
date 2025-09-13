import React, { useState, useEffect } from 'react';
import { Product } from '../../types';

interface ProductFormProps {
  product?: Product;
  onProductAdd?: (product: Product) => void;
  onProductUpdate?: (product: Product) => void;
  onCancel?: () => void;
  existingProducts: Product[];
}

export const ProductForm: React.FC<ProductFormProps> = ({ 
  product, 
  onProductAdd, 
  onProductUpdate, 
  onCancel,
  existingProducts
}) => {
  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price.toString() || '');
  const [description, setDescription] = useState(product?.description || '');
  const [imageUrls, setImageUrls] = useState<string[]>(product?.imageUrls || ['']);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price.toString());
      setDescription(product.description);
      setImageUrls(product.imageUrls);
    }
  }, [product]);

  const handleImageUrlChange = (index: number, value: string) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
  };

  const addImageUrlField = () => {
    setImageUrls([...imageUrls, '']);
  };

  const removeImageUrlField = (index: number) => {
    if (imageUrls.length > 1) {
      const newImageUrls = [...imageUrls];
      newImageUrls.splice(index, 1);
      setImageUrls(newImageUrls);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name.trim()) {
      setError('Product name is required');
      return;
    }
    
    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      setError('Valid price is required');
      return;
    }
    
    if (!description.trim()) {
      setError('Product description is required');
      return;
    }
    
    const filteredImageUrls = imageUrls.filter(url => url.trim() !== '');
    if (filteredImageUrls.length === 0) {
      setError('At least one image URL is required');
      return;
    }

    const productData: Product = {
      id: product?.id || Math.max(0, ...existingProducts.map(p => p.id)) + 1,
      name,
      price: parseFloat(price),
      description,
      imageUrls: filteredImageUrls
    };

    if (product) {
      onProductUpdate && onProductUpdate(productData);
    } else {
      onProductAdd && onProductAdd(productData);
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-brand-charcoal">
          {product ? 'Edit Product' : 'Add New Product'}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {product ? 'Update product details' : 'Add a new product to your catalog'}
        </p>
      </div>
      <div className="border-t border-gray-200">
        <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
          {error && (
            <div className="mb-4 text-red-600">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow-sm focus:ring-brand-tan focus:border-brand-tan block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="price"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="shadow-sm focus:ring-brand-tan focus:border-brand-tan block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="shadow-sm focus:ring-brand-tan focus:border-brand-tan block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700">
                Image URLs
              </label>
              <div className="mt-1 space-y-2">
                {imageUrls.map((url, index) => (
                  <div key={index} className="flex">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => handleImageUrlChange(index, e.target.value)}
                      placeholder="Enter image URL"
                      className="flex-1 shadow-sm focus:ring-brand-tan focus:border-brand-tan block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    {imageUrls.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageUrlField(index)}
                        className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageUrlField}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-brand-charcoal bg-brand-yellow hover:bg-brand-tan focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-tan"
                >
                  Add Image URL
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end space-x-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-tan"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-tan hover:bg-brand-charcoal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-tan"
            >
              {product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};