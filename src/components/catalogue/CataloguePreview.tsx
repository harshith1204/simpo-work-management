import React, { useState } from 'react';
import { Download, Share2, Edit3, ZoomIn, ZoomOut, Monitor, Smartphone, Tablet, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

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

interface CataloguePreviewProps {
  open: boolean;
  onClose: () => void;
  catalogue: Catalogue;
}

const CataloguePreview: React.FC<CataloguePreviewProps> = ({ open, onClose, catalogue }) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [zoom, setZoom] = useState([100]);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = Array.from(new Set(catalogue.products.map(p => p.category)));
  const totalPages = categories.length + 2; // Cover + TOC + categories

  const getViewportClasses = () => {
    switch (viewMode) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      default:
        return 'max-w-4xl mx-auto';
    }
  };

  const handleDownload = () => {
    // Simulate PDF download
    console.log('Downloading catalogue as PDF...');
  };

  const handleShare = () => {
    // Simulate sharing functionality
    console.log('Generating shareable link...');
  };

  const renderCoverPage = () => (
    <div className="bg-white rounded-lg shadow-lg p-8 space-y-8 min-h-[800px] flex flex-col justify-center">
      <div className="text-center space-y-6">
        <div className="w-24 h-24 bg-primary rounded-full mx-auto flex items-center justify-center">
          <span className="text-2xl font-bold text-white">B</span>
        </div>
        <h1 className="text-4xl font-bold text-primary">{catalogue.name}</h1>
        <p className="text-xl text-muted-foreground">Product Catalogue 2024</p>
        <div className="w-32 h-1 bg-primary mx-auto rounded" />
        
        <div className="space-y-2 text-muted-foreground">
          <p>Your Business Name</p>
          <p>contact@yourbusiness.com</p>
          <p>+91 98765 43210</p>
        </div>
        
        <div className="mt-12">
          <Badge className="px-4 py-2 text-sm">
            {catalogue.products.length} Premium Products
          </Badge>
        </div>
      </div>
    </div>
  );

  const renderTableOfContents = () => (
    <div className="bg-white rounded-lg shadow-lg p-8 space-y-8 min-h-[800px]">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary border-b pb-4">Table of Contents</h2>
        
        <div className="space-y-4">
          {categories.map((category, index) => {
            const categoryProducts = catalogue.products.filter(p => p.category === category);
            return (
              <div key={category} className="flex justify-between items-center py-3 border-b border-dotted hover:bg-muted/50 rounded px-2">
                <div>
                  <span className="font-medium text-lg">{category}</span>
                  <span className="text-sm text-muted-foreground ml-2">({categoryProducts.length} items)</span>
                </div>
                <span className="text-muted-foreground font-mono">{index + 3}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">About This Catalogue</h3>
          <p className="text-sm text-muted-foreground">
            This catalogue showcases our premium collection of products, carefully curated for quality and style. 
            All prices are inclusive of taxes and subject to change without notice.
          </p>
        </div>
      </div>
    </div>
  );

  const renderCategoryPage = (category: string) => {
    const categoryProducts = catalogue.products.filter(p => p.category === category);
    
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 space-y-8 min-h-[800px]">
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-3xl font-bold text-primary">{category}</h2>
            <p className="text-muted-foreground mt-2">{categoryProducts.length} premium products</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categoryProducts.map((product) => (
              <div key={product.id} className="space-y-4">
                <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <Badge variant="outline">SKU: {product.sku}</Badge>
                  </div>
                  
                  <p className="text-muted-foreground">{product.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      {product.discount && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{product.price.toLocaleString()}
                        </span>
                      )}
                      <div className="text-2xl font-bold text-primary">
                        ₹{product.discount 
                          ? (product.price * (1 - product.discount / 100)).toLocaleString()
                          : product.price.toLocaleString()
                        }
                      </div>
                      {product.discount && (
                        <Badge className="bg-green-100 text-green-800">
                          {product.discount}% OFF
                        </Badge>
                      )}
                    </div>
                  </div>

                  {Object.keys(product.specifications).length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Specifications</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-muted-foreground">{key}:</span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentPage = () => {
    if (currentPage === 1) return renderCoverPage();
    if (currentPage === 2) return renderTableOfContents();
    
    const categoryIndex = currentPage - 3;
    const category = categories[categoryIndex];
    return renderCategoryPage(category);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Preview: {catalogue.name}</DialogTitle>
            <div className="flex gap-2">
              {/* View Mode Toggles */}
              <div className="flex border rounded">
                <Button
                  variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('desktop')}
                  className="rounded-r-none"
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'tablet' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('tablet')}
                  className="rounded-none"
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('mobile')}
                  className="rounded-l-none"
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>

              <Separator orientation="vertical" className="h-8" />

              {/* Zoom Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setZoom([Math.max(25, zoom[0] - 25)])}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm font-mono w-12 text-center">{zoom[0]}%</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setZoom([Math.min(200, zoom[0] + 25)])}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>

              <Separator orientation="vertical" className="h-8" />

              {/* Action Buttons */}
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex h-full overflow-hidden">
          {/* Page Navigation */}
          <div className="w-64 border-r overflow-y-auto p-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Pages ({totalPages})</h3>
              
              {/* Cover Page */}
              <div
                className={`p-3 rounded cursor-pointer transition-colors ${
                  currentPage === 1 ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
                onClick={() => setCurrentPage(1)}
              >
                <div className="text-sm font-medium">Cover Page</div>
                <div className="text-xs opacity-70">Title & Introduction</div>
              </div>

              {/* Table of Contents */}
              <div
                className={`p-3 rounded cursor-pointer transition-colors ${
                  currentPage === 2 ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
                onClick={() => setCurrentPage(2)}
              >
                <div className="text-sm font-medium">Table of Contents</div>
                <div className="text-xs opacity-70">Navigation</div>
              </div>

              {/* Category Pages */}
              {categories.map((category, index) => (
                <div
                  key={category}
                  className={`p-3 rounded cursor-pointer transition-colors ${
                    currentPage === index + 3 ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                  onClick={() => setCurrentPage(index + 3)}
                >
                  <div className="text-sm font-medium">{category}</div>
                  <div className="text-xs opacity-70">
                    {catalogue.products.filter(p => p.category === category).length} products
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Preview */}
          <div className="flex-1 overflow-y-auto bg-muted/30 p-6">
            <div className={getViewportClasses()}>
              <div 
                style={{ 
                  transform: `scale(${zoom[0] / 100})`,
                  transformOrigin: 'top center'
                }}
              >
                {renderCurrentPage()}
              </div>
            </div>
          </div>
        </div>

        {/* Page Controls */}
        <div className="flex justify-center items-center gap-4 p-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CataloguePreview;