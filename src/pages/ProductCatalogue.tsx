import React, { useState } from 'react';
import { Plus, Eye, Download, Share2, Edit3, Trash2, Grid3X3, List } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ProductAddModal from '@/components/catalogue/ProductAddModal';
import TemplateLibrary from '@/components/catalogue/TemplateLibrary';
import CatalogueEditor from '@/components/catalogue/CatalogueEditor';
import CataloguePreview from '@/components/catalogue/CataloguePreview';

interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  discount?: number;
  category: string;
  image: string;
  specifications: { [key: string]: string };
}

interface Catalogue {
  id: string;
  name: string;
  template: string;
  products: Product[];
  createdAt: string;
  status: 'draft' | 'published';
  thumbnail: string;
}

const ProductCatalogue = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Diamond Ring',
      sku: 'DR001',
      description: 'Elegant 18k gold diamond ring with brilliant cut stones',
      price: 25000,
      discount: 10,
      category: 'Rings',
      image: '/placeholder.svg',
      specifications: { 'Material': '18k Gold', 'Stone': 'Diamond', 'Weight': '2.5g' }
    },
    {
      id: '2',
      name: 'Pearl Necklace',
      sku: 'PN002',
      description: 'Classic freshwater pearl necklace',
      price: 8500,
      category: 'Necklaces',
      image: '/placeholder.svg',
      specifications: { 'Material': 'Freshwater Pearl', 'Length': '18 inches' }
    }
  ]);

  const [catalogues, setCatalogues] = useState<Catalogue[]>([
    {
      id: '1',
      name: 'Summer Collection 2024',
      template: 'jewelry-premium',
      products: products.slice(0, 2),
      createdAt: '2024-01-15',
      status: 'published',
      thumbnail: '/placeholder.svg'
    }
  ]);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('products');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedCatalogue, setSelectedCatalogue] = useState<Catalogue | null>(null);

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Date.now().toString()
    };
    setProducts([...products, newProduct]);
    setShowProductModal(false);
  };

  const handleCreateCatalogue = (template: string) => {
    const newCatalogue: Catalogue = {
      id: Date.now().toString(),
      name: `New Catalogue ${catalogues.length + 1}`,
      template,
      products: [],
      createdAt: new Date().toISOString().split('T')[0],
      status: 'draft',
      thumbnail: '/placeholder.svg'
    };
    setCatalogues([...catalogues, newCatalogue]);
    setSelectedCatalogue(newCatalogue);
    setShowTemplateLibrary(false);
    setShowEditor(true);
  };

  const handleEditCatalogue = (catalogue: Catalogue) => {
    setSelectedCatalogue(catalogue);
    setShowEditor(true);
  };

  const handlePreviewCatalogue = (catalogue: Catalogue) => {
    setSelectedCatalogue(catalogue);
    setShowPreview(true);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleDeleteCatalogue = (catalogueId: string) => {
    setCatalogues(catalogues.filter(c => c.id !== catalogueId));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Product Catalogue</h1>
          <p className="text-muted-foreground">
            Create beautiful product catalogues for your business
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="products">Products ({products.length})</TabsTrigger>
          <TabsTrigger value="catalogues">Catalogues ({catalogues.length})</TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Product Library</h2>
            <Button onClick={() => setShowProductModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>

          {/* Products Grid/List */}
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            : "space-y-4"
          }>
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-square bg-muted relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button size="icon" variant="secondary" className="h-8 w-8">
                      <Edit3 className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="destructive" 
                      className="h-8 w-8"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium truncate">{product.name}</h3>
                      <Badge variant="secondary">{product.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">SKU: {product.sku}</span>
                      <div className="text-right">
                        {product.discount && (
                          <span className="text-xs text-muted-foreground line-through">
                            ₹{product.price}
                          </span>
                        )}
                        <div className="font-semibold">
                          ₹{product.discount 
                            ? (product.price * (1 - product.discount / 100)).toLocaleString()
                            : product.price.toLocaleString()
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">No products added yet</div>
              <Button onClick={() => setShowProductModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Product
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Catalogues Tab */}
        <TabsContent value="catalogues" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">My Catalogues</h2>
            <Button onClick={() => setShowTemplateLibrary(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Catalogue
            </Button>
          </div>

          {/* Catalogues Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {catalogues.map((catalogue) => (
              <Card key={catalogue.id} className="overflow-hidden">
                <div className="aspect-[3/4] bg-muted relative">
                  <img 
                    src={catalogue.thumbnail} 
                    alt={catalogue.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant={catalogue.status === 'published' ? 'default' : 'secondary'}>
                      {catalogue.status}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold">{catalogue.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {catalogue.products.length} products • Created {catalogue.createdAt}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handlePreviewCatalogue(catalogue)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleEditCatalogue(catalogue)}
                      >
                        <Edit3 className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Share2 className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeleteCatalogue(catalogue.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {catalogues.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">No catalogues created yet</div>
              <Button onClick={() => setShowTemplateLibrary(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Catalogue
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <ProductAddModal 
        open={showProductModal}
        onClose={() => setShowProductModal(false)}
        onAdd={handleAddProduct}
      />

      <TemplateLibrary
        open={showTemplateLibrary}
        onClose={() => setShowTemplateLibrary(false)}
        onSelectTemplate={handleCreateCatalogue}
      />

      {selectedCatalogue && (
        <>
          <CatalogueEditor
            open={showEditor}
            onClose={() => setShowEditor(false)}
            catalogue={selectedCatalogue}
            products={products}
            onUpdate={(updated) => {
              setCatalogues(catalogues.map(c => c.id === updated.id ? updated : c));
              setSelectedCatalogue(updated);
            }}
          />

          <CataloguePreview
            open={showPreview}
            onClose={() => setShowPreview(false)}
            catalogue={selectedCatalogue}
          />
        </>
      )}
    </div>
  );
};

export default ProductCatalogue;