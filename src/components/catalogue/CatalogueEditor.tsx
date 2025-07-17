import React, { useState } from 'react';
import { Save, Eye, Download, Share2, Plus, Trash2, Move, Type, Image as ImageIcon, Palette, Layout } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
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

interface CatalogueEditorProps {
  open: boolean;
  onClose: () => void;
  catalogue: Catalogue;
  products: Product[];
  onUpdate: (catalogue: Catalogue) => void;
}

const CatalogueEditor: React.FC<CatalogueEditorProps> = ({ 
  open, 
  onClose, 
  catalogue, 
  products, 
  onUpdate 
}) => {
  const [editingCatalogue, setEditingCatalogue] = useState<Catalogue>(catalogue);
  const [selectedProducts, setSelectedProducts] = useState<string[]>(catalogue.products.map(p => p.id));
  const [settings, setSettings] = useState({
    includeTableOfContents: true,
    includePricing: true,
    includeSpecifications: true,
    watermark: '',
    primaryColor: '#2563eb',
    fontFamily: 'Inter',
    layout: 'grid'
  });

  const availableProducts = products.filter(p => !selectedProducts.includes(p.id));
  const catalogueProducts = products.filter(p => selectedProducts.includes(p.id));

  const handleProductAdd = (productId: string) => {
    setSelectedProducts([...selectedProducts, productId]);
  };

  const handleProductRemove = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(id => id !== productId));
  };

  const handleSave = () => {
    const updatedCatalogue = {
      ...editingCatalogue,
      products: catalogueProducts
    };
    onUpdate(updatedCatalogue);
    onClose();
  };

  const handlePublish = () => {
    const updatedCatalogue = {
      ...editingCatalogue,
      products: catalogueProducts,
      status: 'published' as const
    };
    onUpdate(updatedCatalogue);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Edit Catalogue: {editingCatalogue.name}</DialogTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button size="sm" onClick={handlePublish}>
                Publish
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex h-full overflow-hidden">
          {/* Left Sidebar - Editor Controls */}
          <div className="w-80 border-r overflow-y-auto">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Content Tab */}
              <TabsContent value="content" className="space-y-4 p-4">
                {/* Catalogue Info */}
                <div className="space-y-3">
                  <Label>Catalogue Name</Label>
                  <Input
                    value={editingCatalogue.name}
                    onChange={(e) => setEditingCatalogue({...editingCatalogue, name: e.target.value})}
                    placeholder="Enter catalogue name"
                  />
                </div>

                <Separator />

                {/* Selected Products */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label>Selected Products ({selectedProducts.length})</Label>
                    <Badge variant="secondary">{catalogueProducts.length} items</Badge>
                  </div>
                  
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {catalogueProducts.map((product) => (
                      <div key={product.id} className="flex items-center gap-2 p-2 bg-muted rounded">
                        <img src={product.image} alt={product.name} className="w-8 h-8 rounded object-cover" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{product.name}</div>
                          <div className="text-xs text-muted-foreground">{product.category}</div>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleProductRemove(product.id)}
                          className="h-6 w-6"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Available Products */}
                <div className="space-y-3">
                  <Label>Add Products ({availableProducts.length} available)</Label>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {availableProducts.map((product) => (
                      <div key={product.id} className="flex items-center gap-2 p-2 border rounded">
                        <img src={product.image} alt={product.name} className="w-8 h-8 rounded object-cover" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{product.name}</div>
                          <div className="text-xs text-muted-foreground">{product.category}</div>
                        </div>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleProductAdd(product.id)}
                          className="h-6 w-6"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Design Tab */}
              <TabsContent value="design" className="space-y-4 p-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="flex gap-2">
                      <div 
                        className="w-10 h-10 rounded border-2 border-border"
                        style={{ backgroundColor: settings.primaryColor }}
                      />
                      <Input
                        value={settings.primaryColor}
                        onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                        placeholder="#2563eb"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Font Family</Label>
                    <Select value={settings.fontFamily} onValueChange={(value) => setSettings({...settings, fontFamily: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Arial">Arial</SelectItem>
                        <SelectItem value="Helvetica">Helvetica</SelectItem>
                        <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                        <SelectItem value="Georgia">Georgia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Layout Style</Label>
                    <Select value={settings.layout} onValueChange={(value) => setSettings({...settings, layout: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grid">Grid Layout</SelectItem>
                        <SelectItem value="list">List Layout</SelectItem>
                        <SelectItem value="magazine">Magazine Style</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Watermark Text</Label>
                    <Input
                      value={settings.watermark}
                      onChange={(e) => setSettings({...settings, watermark: e.target.value})}
                      placeholder="Optional watermark text"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-4 p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Include Table of Contents</Label>
                    <Switch 
                      checked={settings.includeTableOfContents}
                      onCheckedChange={(checked) => setSettings({...settings, includeTableOfContents: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Include Pricing</Label>
                    <Switch 
                      checked={settings.includePricing}
                      onCheckedChange={(checked) => setSettings({...settings, includePricing: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Include Specifications</Label>
                    <Switch 
                      checked={settings.includeSpecifications}
                      onCheckedChange={(checked) => setSettings({...settings, includeSpecifications: checked})}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Template</Label>
                    <Select value={editingCatalogue.template}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jewelry-premium">Jewelry Premium</SelectItem>
                        <SelectItem value="jewelry-minimal">Jewelry Minimal</SelectItem>
                        <SelectItem value="electronics-modern">Electronics Modern</SelectItem>
                        <SelectItem value="fashion-trendy">Fashion Trendy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Main Preview Area */}
          <div className="flex-1 p-6 overflow-y-auto bg-muted/30">
            <div className="max-w-4xl mx-auto">
              {/* Catalogue Preview */}
              <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
                {/* Cover Page */}
                <div className="text-center space-y-4 pb-8 border-b">
                  <h1 className="text-3xl font-bold" style={{ color: settings.primaryColor }}>
                    {editingCatalogue.name}
                  </h1>
                  <p className="text-muted-foreground">Product Catalogue 2024</p>
                  <div className="w-20 h-1 bg-primary mx-auto rounded" style={{ backgroundColor: settings.primaryColor }} />
                </div>

                {/* Table of Contents */}
                {settings.includeTableOfContents && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Table of Contents</h2>
                    <div className="space-y-2">
                      {Array.from(new Set(catalogueProducts.map(p => p.category))).map((category, index) => (
                        <div key={category} className="flex justify-between items-center py-1 border-b border-dotted">
                          <span>{category}</span>
                          <span className="text-muted-foreground">{index + 2}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Products by Category */}
                {Array.from(new Set(catalogueProducts.map(p => p.category))).map((category) => (
                  <div key={category} className="space-y-6">
                    <h2 className="text-2xl font-semibold border-b pb-2" style={{ color: settings.primaryColor }}>
                      {category}
                    </h2>
                    
                    <div className={
                      settings.layout === 'grid' 
                        ? "grid grid-cols-2 md:grid-cols-3 gap-6"
                        : "space-y-6"
                    }>
                      {catalogueProducts
                        .filter(p => p.category === category)
                        .map((product) => (
                          <div key={product.id} className="space-y-3">
                            <div className="aspect-square bg-muted rounded overflow-hidden">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="space-y-2">
                              <h3 className="font-medium">{product.name}</h3>
                              <p className="text-sm text-muted-foreground">{product.description}</p>
                              
                              {settings.includePricing && (
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-muted-foreground">SKU: {product.sku}</span>
                                  <span className="font-semibold">₹{product.price.toLocaleString()}</span>
                                </div>
                              )}

                              {settings.includeSpecifications && Object.keys(product.specifications).length > 0 && (
                                <div className="text-xs space-y-1">
                                  {Object.entries(product.specifications).map(([key, value]) => (
                                    <div key={key} className="flex justify-between">
                                      <span className="text-muted-foreground">{key}:</span>
                                      <span>{value}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}

                {/* Watermark */}
                {settings.watermark && (
                  <div className="text-center text-xs text-muted-foreground opacity-50">
                    {settings.watermark}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 p-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CatalogueEditor;