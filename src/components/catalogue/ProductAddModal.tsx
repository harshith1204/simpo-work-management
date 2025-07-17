import React, { useState } from 'react';
import { Plus, Upload, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface ProductAddModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (product: {
    name: string;
    sku: string;
    description: string;
    price: number;
    discount?: number;
    category: string;
    image: string;
    specifications: { [key: string]: string };
  }) => void;
}

const ProductAddModal: React.FC<ProductAddModalProps> = ({ open, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    price: '',
    discount: '',
    category: '',
    image: '/placeholder.svg'
  });

  const [specifications, setSpecifications] = useState<Array<{ key: string; value: string }>>([
    { key: '', value: '' }
  ]);

  const categories = [
    'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Watches', 
    'Electronics', 'Clothing', 'Furniture', 'Services', 'Other'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSpecificationChange = (index: number, field: 'key' | 'value', value: string) => {
    const updated = [...specifications];
    updated[index][field] = value;
    setSpecifications(updated);
  };

  const addSpecificationRow = () => {
    setSpecifications([...specifications, { key: '', value: '' }]);
  };

  const removeSpecificationRow = (index: number) => {
    if (specifications.length > 1) {
      setSpecifications(specifications.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const specs = specifications.reduce((acc, spec) => {
      if (spec.key && spec.value) {
        acc[spec.key] = spec.value;
      }
      return acc;
    }, {} as { [key: string]: string });

    onAdd({
      name: formData.name,
      sku: formData.sku,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      discount: formData.discount ? parseFloat(formData.discount) : undefined,
      category: formData.category,
      image: formData.image,
      specifications: specs
    });

    // Reset form
    setFormData({
      name: '',
      sku: '',
      description: '',
      price: '',
      discount: '',
      category: '',
      image: '/placeholder.svg'
    });
    setSpecifications([{ key: '', value: '' }]);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Image */}
          <div className="space-y-2">
            <Label>Product Image</Label>
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src={formData.image} 
                  alt="Product preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <Button type="button" variant="outline" className="h-24">
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sku">SKU/Code *</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => handleInputChange('sku', e.target.value)}
                placeholder="e.g., DR001"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your product..."
              rows={3}
            />
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="0"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount">Discount (%)</Label>
              <Input
                id="discount"
                type="number"
                value={formData.discount}
                onChange={(e) => handleInputChange('discount', e.target.value)}
                placeholder="0"
                min="0"
                max="100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Specifications */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Specifications</Label>
              <Button type="button" variant="outline" size="sm" onClick={addSpecificationRow}>
                <Plus className="h-3 w-3 mr-1" />
                Add Row
              </Button>
            </div>

            <Card>
              <CardContent className="p-4 space-y-3">
                {specifications.map((spec, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      placeholder="Property (e.g., Material)"
                      value={spec.key}
                      onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Value (e.g., 18k Gold)"
                      value={spec.value}
                      onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                      className="flex-1"
                    />
                    {specifications.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSpecificationRow(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Add Product
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductAddModal;