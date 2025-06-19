
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, 
  Smartphone, 
  MapPin, 
  Camera, 
  Wifi, 
  Clock, 
  Bell, 
  Shield, 
  Calendar,
  Mail,
  MessageSquare,
  Database
} from "lucide-react";

const AttendanceSettings = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Settings</h1>
          <p className="text-gray-600 mt-1">Configure attendance policies, modes, and system preferences</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">Reset to Default</Button>
          <Button>Save Changes</Button>
        </div>
      </div>

      {/* Attendance Modes */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone className="w-5 h-5" />
            <span>Attendance Modes</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Camera className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Selfie Verification</h4>
                  <p className="text-sm text-gray-500">Capture photo during punch in/out</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">GPS Tracking</h4>
                  <p className="text-sm text-gray-500">Location-based attendance verification</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Wifi className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">IP Restriction</h4>
                  <p className="text-sm text-gray-500">Allow punch only from office networks</p>
                </div>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <Shield className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Biometric Integration</h4>
                  <p className="text-sm text-gray-500">Connect with biometric devices</p>
                </div>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Working Hours & Grace Periods */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Working Hours & Grace Periods</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-900">Late Entry Buffer</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  defaultValue="15" 
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-500">minutes</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-900">Half Day Threshold</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  defaultValue="4" 
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-500">hours</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-900">Full Day Threshold</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  defaultValue="8" 
                  step="0.5"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-500">hours</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-900">Working Week</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>5 Days (Mon-Fri)</option>
                <option>6 Days (Mon-Sat)</option>
                <option>Custom Schedule</option>
              </select>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-900">Overtime Calculation</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Daily (>8 hours)</option>
                <option>Weekly (>40 hours)</option>
                <option>Both Daily & Weekly</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Auto-Reminders & Notifications */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Auto-Reminders & Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Punch-in Reminders</h4>
                  <p className="text-sm text-gray-500">Notify after 15 mins of shift start</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Auto-logout</h4>
                  <p className="text-sm text-gray-500">Automatic checkout after 12 hours</p>
                </div>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <Mail className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-500">Send daily attendance summary</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">SMS Alerts</h4>
                  <p className="text-sm text-gray-500">Critical attendance alerts via SMS</p>
                </div>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lock Periods & Data Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Lock Periods</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-900">Auto-lock entries after</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  defaultValue="7" 
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>days</option>
                  <option>weeks</option>
                  <option>months</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Allow retroactive changes</span>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Require approval for changes</span>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5" />
              <span>Integration Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Sync with Payroll</h4>
                <p className="text-sm text-gray-500">Auto-sync overtime & deductions</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Sync with Leave Management</h4>
                <p className="text-sm text-gray-500">Sync leave status with attendance</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-900">Biometric API Endpoint</label>
              <input 
                type="url" 
                placeholder="https://api.biometric-device.com/v1"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekend Configuration */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Weekend & Weekly Offs</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-900 mb-3 block">Default Weekend Days</label>
              <div className="flex flex-wrap gap-2">
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                  <label key={day} className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      defaultChecked={day === 'Sunday' || day === 'Saturday'}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{day}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Allow different weekend config per shift</span>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Allow different weekend config per location</span>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceSettings;
