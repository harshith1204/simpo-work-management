import React, { useState } from 'react';
import { Search, Eye, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  description: string;
  isPremium: boolean;
  rating: number;
  downloads: number;
}

interface TemplateLibraryProps {
  open: boolean;
  onClose: () => void;
  onSelectTemplate: (templateId: string) => void;
}

const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ open, onClose, onSelectTemplate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates: Template[] = [
    {
      id: 'jewelry-premium',
      name: 'Jewelry Premium',
      category: 'jewelry',
      thumbnail: '/placeholder.svg',
      description: 'Elegant template for luxury jewelry showcases',
      isPremium: false,
      rating: 4.8,
      downloads: 1250
    },
    {
      id: 'jewelry-minimal',
      name: 'Jewelry Minimal',
      category: 'jewelry',
      thumbnail: '/placeholder.svg',
      description: 'Clean and minimal design for modern jewelry brands',
      isPremium: false,
      rating: 4.6,
      downloads: 890
    },
    {
      id: 'electronics-modern',
      name: 'Electronics Modern',
      category: 'electronics',
      thumbnail: '/placeholder.svg',
      description: 'Tech-focused design for electronic products',
      isPremium: true,
      rating: 4.9,
      downloads: 2100
    },
    {
      id: 'fashion-trendy',
      name: 'Fashion Trendy',
      category: 'fashion',
      thumbnail: '/placeholder.svg',
      description: 'Stylish template for clothing and fashion items',
      isPremium: false,
      rating: 4.7,
      downloads: 1560
    },
    {
      id: 'furniture-classic',
      name: 'Furniture Classic',
      category: 'furniture',
      thumbnail: '/placeholder.svg',
      description: 'Traditional design for furniture catalogues',
      isPremium: false,
      rating: 4.5,
      downloads: 720
    },
    {
      id: 'services-corporate',
      name: 'Services Corporate',
      category: 'services',
      thumbnail: '/placeholder.svg',
      description: 'Professional template for service businesses',
      isPremium: true,
      rating: 4.8,
      downloads: 980
    },
    {
      id: 'beauty-elegant',
      name: 'Beauty Elegant',
      category: 'beauty',
      thumbnail: '/placeholder.svg',
      description: 'Sophisticated design for beauty and cosmetics',
      isPremium: false,
      rating: 4.6,
      downloads: 650
    },
    {
      id: 'food-rustic',
      name: 'Food Rustic',
      category: 'food',
      thumbnail: '/placeholder.svg',
      description: 'Warm and inviting template for food products',
      isPremium: false,
      rating: 4.4,
      downloads: 420
    }
  ];

  const categories = [
    { id: 'all', label: 'All Templates', count: templates.length },
    { id: 'jewelry', label: 'Jewelry', count: templates.filter(t => t.category === 'jewelry').length },
    { id: 'electronics', label: 'Electronics', count: templates.filter(t => t.category === 'electronics').length },
    { id: 'fashion', label: 'Fashion', count: templates.filter(t => t.category === 'fashion').length },
    { id: 'furniture', label: 'Furniture', count: templates.filter(t => t.category === 'furniture').length },
    { id: 'services', label: 'Services', count: templates.filter(t => t.category === 'services').length },
    { id: 'beauty', label: 'Beauty', count: templates.filter(t => t.category === 'beauty').length },
    { id: 'food', label: 'Food', count: templates.filter(t => t.category === 'food').length }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectTemplate = (templateId: string) => {
    onSelectTemplate(templateId);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Choose a Template</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Categories and Templates */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="flex-1 overflow-hidden">
            <TabsList className="grid grid-cols-4 md:grid-cols-8 w-full">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="text-xs"
                >
                  {category.label}
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {category.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-4 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredTemplates.map((template) => (
                  <Card 
                    key={template.id} 
                    className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleSelectTemplate(template.id)}
                  >
                    <div className="aspect-[3/4] bg-muted relative">
                      <img 
                        src={template.thumbnail} 
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Premium Badge */}
                      {template.isPremium && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                            Premium
                          </Badge>
                        </div>
                      )}

                      {/* Quick Actions */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="secondary" className="h-8 w-8">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Rating */}
                      <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {template.rating}
                      </div>
                    </div>

                    <CardContent className="p-3">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">{template.name}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {template.description}
                        </p>
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>{template.downloads.toLocaleString()} downloads</span>
                          <Badge variant="outline" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredTemplates.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-muted-foreground mb-4">
                    No templates found matching your criteria
                  </div>
                  <Button variant="outline" onClick={() => {setSearchTerm(''); setSelectedCategory('all');}}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateLibrary;