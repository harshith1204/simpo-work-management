
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Clock, User, MapPin, Calendar, Bell, FileText } from "lucide-react";

interface TeamMemberActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee?: {
    name: string;
    designation: string;
    department: string;
    avatar: string;
    status: string;
    checkIn: string;
    checkOut: string;
    workingHours: string;
    location: string;
    shift: string;
  };
}

const TeamMemberActionModal = ({ isOpen, onClose, employee }: TeamMemberActionModalProps) => {
  const [selectedAction, setSelectedAction] = useState("");
  const [notes, setNotes] = useState("");

  if (!isOpen || !employee) return null;

  const actions = [
    { id: "mark-present", label: "Mark Present", icon: Clock, description: "Manually mark employee as present" },
    { id: "mark-absent", label: "Mark Absent", icon: X, description: "Mark employee as absent for today" },
    { id: "send-reminder", label: "Send Reminder", icon: Bell, description: "Send punch-in reminder notification" },
    { id: "view-history", label: "View History", icon: FileText, description: "View detailed attendance history" },
    { id: "edit-attendance", label: "Edit Attendance", icon: User, description: "Edit attendance record" },
  ];

  const handleAction = () => {
    console.log("Performing action:", selectedAction, "for", employee.name, "with notes:", notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle>Team Member Actions</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Employee Info */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-lg font-medium text-blue-700">{employee.avatar}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                <p className="text-sm text-gray-600">{employee.designation}</p>
                <p className="text-xs text-gray-500">{employee.department}</p>
              </div>
              <div className="text-right">
                <Badge 
                  className={
                    employee.status === "Present" ? "bg-green-100 text-green-800" :
                    employee.status === "Late" ? "bg-orange-100 text-orange-800" :
                    employee.status === "WFH" ? "bg-blue-100 text-blue-800" :
                    employee.status === "On Leave" ? "bg-purple-100 text-purple-800" :
                    "bg-red-100 text-red-800"
                  }
                >
                  {employee.status}
                </Badge>
              </div>
            </div>

            {/* Current Status */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Check In</div>
                <div className="font-semibold text-gray-900">{employee.checkIn}</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Check Out</div>
                <div className="font-semibold text-gray-900">{employee.checkOut}</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Working Hours</div>
                <div className="font-semibold text-blue-600">{employee.workingHours}</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Location</div>
                <div className="font-semibold text-gray-900">{employee.location}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Available Actions</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {actions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={() => setSelectedAction(action.id)}
                      className={`p-4 border rounded-lg text-left transition-colors ${
                        selectedAction === action.id 
                          ? "border-blue-500 bg-blue-50" 
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-gray-600" />
                        <div>
                          <div className="font-medium text-gray-900">{action.label}</div>
                          <div className="text-sm text-gray-500">{action.description}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notes */}
            {selectedAction && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Notes (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any additional notes or comments..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={handleAction} disabled={!selectedAction}>
                Perform Action
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamMemberActionModal;
