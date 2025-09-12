import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrls: string[];
}

const initialProducts: Product[] = [
  { 
    id: 1, 
    name: 'Ethereal Diamond Ring', 
    price: 1250000, 
    imageUrls: ['https://images.unsplash.com/photo-1598564344381-12954b05a691?q=80&w=600'],
    description: 'An exquisitely crafted ring featuring a brilliant-cut, ethically sourced diamond set in a 14k white gold band. The timeless design makes it a perfect choice for engagements or special anniversaries.'
  },
  { 
    id: 2, 
    name: 'Golden Loop Earrings', 
    price: 450000, 
    imageUrls: ['https://images.unsplash.com/photo-1620921098638-c6b38c23577d?q=80&w=600'],
    description: 'Elegant and versatile, these golden loop earrings are a must-have in any jewelry collection. Made from 18k gold plating over sterling silver, they offer a classic look with a modern twist.'
  },
  { 
    id: 3, 
    name: 'Azure Pendant Necklace', 
    price: 680000, 
    imageUrls: ['https://images.unsplash.com/photo-1611652032936-a85a49931b73?q=80&w=600'],
    description: 'This stunning necklace features a deep blue sapphire pendant, suspended from a delicate silver chain. The vibrant color of the stone is reminiscent of the summer sky, adding a touch of elegance to any outfit.'
  }
];

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imageUrls: ''
  });

  const handleAddProduct = () => {
    setShowAddForm(true);
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      description: '',
      imageUrls: ''
    });
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowAddForm(true);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      imageUrls: product.imageUrls.join(', ')
    });
  };

  const handleDeleteProduct = (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== productId));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: Product = {
      id: editingProduct ? editingProduct.id : products.length + 1,
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      imageUrls: formData.imageUrls.split(',').map(url => url.trim())
    };
    
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(product => 
        product.id === editingProduct.id ? newProduct : product
      ));
    } else {
      // Add new product
      setProducts([...products, newProduct]);
    }
    
    setShowAddForm(false);
    setEditingProduct(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Products
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={handleAddProduct}
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-charcoal hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-charcoal"
          >
            Add Product
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="mt-6 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>
            <form className="mt-5 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6" onSubmit={handleFormSubmit}>
              <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-charcoal focus:ring-brand-charcoal sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price (UGX)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-charcoal focus:ring-brand-charcoal sm:text-sm"
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
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-charcoal focus:ring-brand-charcoal sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="imageUrls" className="block text-sm font-medium text-gray-700">
                  Image URLs (comma separated)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="imageUrls"
                    name="imageUrls"
                    value={formData.imageUrls}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-charcoal focus:ring-brand-charcoal sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-charcoal focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-brand-charcoal py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-charcoal focus:ring-offset-2"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Product
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Price
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src={product.imageUrls[0]} alt={product.name} />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="text-gray-500 line-clamp-1">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="text-gray-900">UGX {product.price.toLocaleString()}</div>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-brand-charcoal hover:text-gray-800 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};