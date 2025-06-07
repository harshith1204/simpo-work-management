
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, MapPin, Phone, Mail, Globe, Edit } from "lucide-react";

const CompanySetup = () => {
  const companyData = {
    name: "TechCorp Solutions Pvt Ltd",
    address: "123 Business Park, Sector 18, Gurgaon, Haryana 122015",
    phone: "+91 124 456 7890",
    email: "hr@techcorp.com",
    website: "www.techcorp.com",
    pan: "AABCT1234C",
    tan: "DELH12345F",
    pfNumber: "DL/CPM/26293",
    esiNumber: "22000149420000999"
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Company Setup</h1>
          <p className="text-gray-600 mt-2">Manage your company information and compliance details</p>
        </div>
        <Button>
          <Edit className="w-4 h-4 mr-2" />
          Edit Details
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="w-5 h-5" />
              <span>Basic Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Company Name</label>
              <p className="text-gray-900 font-medium">{companyData.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Address</label>
              <p className="text-gray-900">{companyData.address}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Phone</label>
                <p className="text-gray-900">{companyData.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-gray-900">{companyData.email}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Website</label>
              <p className="text-gray-900">{companyData.website}</p>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Information */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">PAN Number</label>
                <p className="text-gray-900 font-mono">{companyData.pan}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">TAN Number</label>
                <p className="text-gray-900 font-mono">{companyData.tan}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">PF Number</label>
              <p className="text-gray-900 font-mono">{companyData.pfNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">ESI Number</label>
              <p className="text-gray-900 font-mono">{companyData.esiNumber}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Organization Structure */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Organization Chart</h3>
            <p className="text-gray-600 mb-4">Visual representation of your company structure will appear here</p>
            <Button variant="outline">
              Configure Org Chart
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanySetup;
