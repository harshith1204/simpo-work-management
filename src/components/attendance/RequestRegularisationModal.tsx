
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Clock, MapPin, Camera, AlertCircle } from "lucide-react";

interface RequestRegularisationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: string;
}

const RequestRegularisationModal = ({ isOpen, onClose, selectedDate }: RequestRegularisationModalProps) => {
  const [requestType, setRequestType] = useState("regularisation");
  const [reason, setReason] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    // Handle form submission
    console.log("Submitting request:", { requestType, reason, checkInTime, checkOutTime, selectedDate });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle>Request Regularisation</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Attendance Record */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Current Record for {selectedDate || "Today"}</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Check In:</span>
                  <span className="font-medium">09:45 AM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Check Out:</span>
                  <span className="font-medium">06:30 PM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">Office</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Camera className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Mode:</span>
                  <span className="font-medium">Mobile App</span>
                </div>
              </div>
              <Badge className="mt-2 bg-orange-100 text-orange-800">Late Entry</Badge>
            </div>

            {/* Request Type */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-900">Request Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRequestType("regularisation")}
                  className={`p-3 border rounded-lg text-left ${
                    requestType === "regularisation" 
                      ? "border-blue-500 bg-blue-50 text-blue-700" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="font-medium">Regularisation</div>
                  <div className="text-sm text-gray-500">Correct punch timings</div>
                </button>
                <button
                  type="button"
                  onClick={() => setRequestType("permission")}
                  className={`p-3 border rounded-lg text-left ${
                    requestType === "permission" 
                      ? "border-blue-500 bg-blue-50 text-blue-700" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="font-medium">Permission</div>
                  <div className="text-sm text-gray-500">Request time off</div>
                </button>
              </div>
            </div>

            {/* Correct Timings */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Correct Check In Time</label>
                <input 
                  type="time"
                  value={checkInTime}
                  onChange={(e) => setCheckInTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Correct Check Out Time</label>
                <input 
                  type="time"
                  value={checkOutTime}
                  onChange={(e) => setCheckOutTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Reason */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Reason for Request</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Please provide a detailed reason for this request..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
              />
            </div>

            {/* Policy Note */}
            <div className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg">
              <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-700">
                <p className="font-medium">Policy Reminder:</p>
                <p>Regularisation requests must be submitted within 7 days of the occurrence and require manager approval.</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={handleSubmit} disabled={!reason.trim()}>
                Submit Request
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RequestRegularisationModal;
