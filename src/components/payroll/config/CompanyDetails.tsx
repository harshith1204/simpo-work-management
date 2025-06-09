
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Upload, Building2 } from "lucide-react";

interface CompanyDetailsProps {
  onComplete: () => void;
}

const CompanyDetails = ({ onComplete }: CompanyDetailsProps) => {
  const [workLocations, setWorkLocations] = useState([{ name: "", city: "", state: "" }]);
  const [formData, setFormData] = useState({
    companyName: "",
    panNumber: "",
    gstNumber: "",
    cinNumber: "",
    registeredAddress: "",
    hrContactName: "",
    hrContactPhone: "",
    companyLogo: null as File | null
  });

  const addWorkLocation = () => {
    setWorkLocations([...workLocations, { name: "", city: "", state: "" }]);
  };

  const removeWorkLocation = (index: number) => {
    setWorkLocations(workLocations.filter((_, i) => i !== index));
  };

  const updateWorkLocation = (index: number, field: string, value: string) => {
    const updated = workLocations.map((location, i) => 
      i === index ? { ...location, [field]: value } : location
    );
    setWorkLocations(updated);
  };

  const handleSave = () => {
    // Save logic here
    onComplete();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Building2 className="w-5 h-5" />
          <span>Company Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              placeholder="Enter company name"
            />
          </div>
          <div>
            <Label htmlFor="panNumber">PAN Number</Label>
            <Input
              id="panNumber"
              value={formData.panNumber}
              onChange={(e) => setFormData({...formData, panNumber: e.target.value})}
              placeholder="AAACH1234C"
              maxLength={10}
            />
          </div>
          <div>
            <Label htmlFor="gstNumber">GST Number (Optional)</Label>
            <Input
              id="gstNumber"
              value={formData.gstNumber}
              onChange={(e) => setFormData({...formData, gstNumber: e.target.value})}
              placeholder="15 character alphanumeric"
              maxLength={15}
            />
          </div>
          <div>
            <Label htmlFor="cinNumber">CIN Number (Optional)</Label>
            <Input
              id="cinNumber"
              value={formData.cinNumber}
              onChange={(e) => setFormData({...formData, cinNumber: e.target.value})}
              placeholder="21 characters"
              maxLength={21}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="registeredAddress">Registered Address</Label>
          <Textarea
            id="registeredAddress"
            value={formData.registeredAddress}
            onChange={(e) => setFormData({...formData, registeredAddress: e.target.value})}
            placeholder="Enter complete registered address"
            rows={3}
          />
        </div>

        {/* Work Locations */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Label>Work Locations</Label>
            <Button onClick={addWorkLocation} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Location
            </Button>
          </div>
          <div className="space-y-4">
            {workLocations.map((location, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                <Input
                  placeholder="Location Name"
                  value={location.name}
                  onChange={(e) => updateWorkLocation(index, 'name', e.target.value)}
                />
                <Input
                  placeholder="City"
                  value={location.city}
                  onChange={(e) => updateWorkLocation(index, 'city', e.target.value)}
                />
                <Select onValueChange={(value) => updateWorkLocation(index, 'state', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                    {/* Add more states */}
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => removeWorkLocation(index)}
                  size="sm"
                  variant="outline"
                  disabled={workLocations.length === 1}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* HR Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="hrContactName">HR Contact Person</Label>
            <Input
              id="hrContactName"
              value={formData.hrContactName}
              onChange={(e) => setFormData({...formData, hrContactName: e.target.value})}
              placeholder="Contact person name"
            />
          </div>
          <div>
            <Label htmlFor="hrContactPhone">HR Contact Phone</Label>
            <Input
              id="hrContactPhone"
              value={formData.hrContactPhone}
              onChange={(e) => setFormData({...formData, hrContactPhone: e.target.value})}
              placeholder="Phone number"
            />
          </div>
        </div>

        {/* Company Logo */}
        <div>
          <Label>Company Logo</Label>
          <div className="mt-2 flex items-center space-x-4">
            <Button variant="outline" onClick={() => document.getElementById('logo-upload')?.click()}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Logo
            </Button>
            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFormData({...formData, companyLogo: e.target.files?.[0] || null})}
            />
            {formData.companyLogo && (
              <span className="text-sm text-gray-600">{formData.companyLogo.name}</span>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Company Details</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyDetails;
