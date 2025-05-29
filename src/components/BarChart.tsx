
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  title: string;
  color?: string;
}

const BarChart = ({ data, title, color = "#3B82F6" }: BarChartProps) => {
  return (
    <div className="w-full h-64">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill={color} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
