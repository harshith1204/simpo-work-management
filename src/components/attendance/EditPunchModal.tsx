
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Clock, MapPin, Camera, Wifi, AlertTriangle } from "lucide-react";

interface EditPunchModalProps {
  isOpen: boolean;
  onClose: () => void;
  punchData?: {
    date: string;
    checkIn: string;
    checkOut: string;
    mode: string;
    location: string;
    status: string;
  };
}

const EditPunchModal = ({ isOpen, onClose, punchData }: EditPunchModalProps) => {
  const [checkInTime, setCheckInTime] = useState(punchData?.checkIn || "");
  const [checkOutTime, setCheckOutTime] = useState(punchData?.checkOut || "");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    console.log("Saving punch edit:", { checkInTime, checkOutTime, notes });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg mx-4">
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle>Edit Punch Record</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Record */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Current Record - {punchData?.date}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Check In:</span>
                  </div>
                  <span className="font-medium">{punchData?.checkIn}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Check Out:</span>
                  </div>
                  <span className="font-medium">{punchData?.checkOut}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Location:</span>
                  </div>
                  <span className="font-medium">{punchData?.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {punchData?.mode === "Mobile App" ? 
                      <Camera className="w-4 h-4 text-gray-400" /> : 
                      <Wifi className="w-4 h-4 text-gray-400" />
                    }
                    <span className="text-gray-600">Mode:</span>
                  </div>
                  <span className="font-medium">{punchData?.mode}</span>
                </div>
              </div>
              <div className="mt-2">
                <Badge 
                  className={
                    punchData?.status === "completed" ? "bg-green-100 text-green-800" :
                    punchData?.status === "ongoing" ? "bg-blue-100 text-blue-800" :
                    punchData?.status === "late" ? "bg-orange-100 text-orange-800" :
                    "bg-gray-100 text-gray-800"
                  }
                >
                  {punchData?.status}
                </Badge>
              </div>
            </div>

            {/* Edit Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Check In Time</label>
                  <input 
                    type="time"
                    value={checkInTime}
                    onChange={(e) => setCheckInTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Check Out Time</label>
                  <input 
                    type="time"
                    value={checkOutTime}
                    onChange={(e) => setCheckOutTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Reason for Edit</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Please provide a reason for editing this punch record..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                />
              </div>
            </div>

            {/* Warning */}
            <div className="flex items-start space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-700">
                <p className="font-medium">Important:</p>
                <p>Editing punch records requires manager approval and will create an audit trail.</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={handleSave} disabled={!notes.trim()}>
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditPunchModal;
