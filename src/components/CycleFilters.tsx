
import { Filter, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const CycleFilters = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="rounded-full bg-blue-50 text-blue-600 border-blue-300">
              All cycles
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              Assigned to me
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <ArrowUpDown className="w-4 h-4 text-gray-400" />
          <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
            <option>Sort by start date</option>
            <option>Sort by progress %</option>
            <option>Sort by end date</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CycleFilters;
