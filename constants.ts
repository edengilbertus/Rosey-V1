
import { Product } from './types';

export const CATALOGUE_PRODUCTS: Product[] = [
  { 
    id: 1, 
    name: 'Ethereal Diamond Ring', 
    price: 1250.00, 
    imageUrls: ['https://images.unsplash.com/photo-1598564344381-12954b05a691?q=80&w=600', 'https://images.unsplash.com/photo-1611652032936-a85a49931b73?q=80&w=600', 'https://images.unsplash.com/photo-1605001103569-731380757b15?q=80&w=600'],
    description: 'An exquisitely crafted ring featuring a brilliant-cut, ethically sourced diamond set in a 14k white gold band. The timeless design makes it a perfect choice for engagements or special anniversaries.'
  },
  { 
    id: 2, 
    name: 'Golden Loop Earrings', 
    price: 450.00, 
    imageUrls: ['https://images.unsplash.com/photo-1620921098638-c6b38c23577d?q=80&w=600', 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=600'],
    description: 'Elegant and versatile, these golden loop earrings are a must-have in any jewelry collection. Made from 18k gold plating over sterling silver, they offer a classic look with a modern twist.'
  },
  { 
    id: 3, 
    name: 'Azure Pendant Necklace', 
    price: 680.00, 
    imageUrls: ['https://images.unsplash.com/photo-1611652032936-a85a49931b73?q=80&w=600', 'https://images.unsplash.com/photo-1598564344381-12954b05a691?q=80&w=600'],
    description: 'This stunning necklace features a deep blue sapphire pendant, suspended from a delicate silver chain. The vibrant color of the stone is reminiscent of the summer sky, adding a touch of elegance to any outfit.'
  },
  { 
    id: 4, 
    name: 'Rose Gold Bangle', 
    price: 890.00, 
    imageUrls: ['https://images.unsplash.com/photo-1610495144214-c1a78b663852?q=80&w=600', 'https://images.unsplash.com/photo-1620921098638-c6b38c23577d?q=80&w=600'],
    description: 'A chic and minimalist rose gold bangle that can be worn alone or stacked with other bracelets. Its smooth, polished finish reflects light beautifully, making it a subtle yet glamorous accessory.'
  },
  { 
    id: 5, 
    name: 'Pearl Drop Earrings', 
    price: 320.00, 
    imageUrls: ['https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=600', 'https://images.unsplash.com/photo-1611652032936-a85a49931b73?q=80&w=600'],
    description: 'Classic and sophisticated, these earrings feature lustrous freshwater pearls dangling from sterling silver hooks. They are the perfect accessory for weddings, formal events, or everyday elegance.'
  },
  { 
    id: 6, 
    name: 'Vintage Signet Ring', 
    price: 550.00, 
    imageUrls: ['https://images.unsplash.com/photo-1605001103569-731380757b15?q=80&w=600', 'https://images.unsplash.com/photo-1598564344381-12954b05a691?q=80&w=600'],
    description: 'Inspired by vintage designs, this signet ring is crafted from solid gold and can be personalized with an engraving. It\'s a statement piece that adds a touch of old-world charm to a modern wardrobe.'
  },
  { 
    id: 7, 
    name: 'Sapphire Studs', 
    price: 980.00, 
    imageUrls: ['https://images.unsplash.com/photo-1599354753554-7389a128e235?q=80&w=600', 'https://images.unsplash.com/photo-1610495144214-c1a78b663852?q=80&w=600'],
    description: 'Deep blue sapphires set in a simple, elegant stud design. These earrings are perfect for adding a pop of color and a touch of luxury to your daily look.'
  },
  { 
    id: 8, 
    name: 'Delicate Chain Bracelet', 
    price: 250.00, 
    imageUrls: ['https://images.unsplash.com/photo-1627293589115-6430513c5166?q=80&w=600', 'https://images.unsplash.com/photo-1605001103569-731380757b15?q=80&w=600'],
    description: 'A beautifully delicate chain bracelet made from 14k gold. It\'s light, comfortable, and perfect for layering with other pieces or wearing on its own for a minimalist statement.'
  },
];

export const BEST_SELLER_PRODUCTS: Product[] = CATALOGUE_PRODUCTS.slice(0, 6);
