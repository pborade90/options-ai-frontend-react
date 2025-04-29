import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard({ user }) {
  const [stock, setStock] = useState('amzn');
  const [graphData, setGraphData] = useState(null);
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isYearly, setIsYearly] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_BASE;

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      // Fetching stock data and recommendation
      const endpoint = isYearly ? `/yearly/${stock}` : `/fetch/${stock}`;
      const response = await axios.get(`${BASE_URL}${endpoint}`);
      const data = response.data;

      // Fetch moving average recommendation
      const recommendationResponse = await axios.get(`${BASE_URL}/recommendation/${stock}`);
      const recommendationData = recommendationResponse.data;

      setRecommendation(recommendationData.recommendation);

      // Handle Yearly Data
      if (isYearly) {
        const labels = data.yearly_data.map(item => item.year);
        const closePrices = data.yearly_data.map(item => item.close);

        setGraphData({
          labels,
          datasets: [
            {
              label: `${stock.toUpperCase()} Closing Prices (Yearly)`,
              data: closePrices,
              borderColor: '#c44536',
              backgroundColor: 'rgba(196, 69, 54, 0.5)',
              fill: true,
            },
          ],
        });

      } else {
        let filteredData = data.data;

        // Filter data if start and end dates are set
        if (startDate && endDate) {
          filteredData = filteredData.filter(item => {
            const d = new Date(item.date);
            return d >= startDate && d <= endDate;
          });
        } else {
          filteredData = filteredData.slice(-365); // default to last 365 days
        }

        const labels = filteredData.map(item => item.date);
        const closePrices = filteredData.map(item => item.close);

        setGraphData({
          labels,
          datasets: [
            {
              label: `${stock.toUpperCase()} Closing Prices (Daily)`,
              data: closePrices,
              borderColor: '#132a13',
              backgroundColor: 'rgba(19, 42, 19, 0.5)',
              fill: true,
            },
          ],
        });
      }
    } catch (err) {
      console.error('Error fetching stock data:', err);
      setError('Something went wrong while fetching stock data.');
      setGraphData(null);
      setRecommendation('');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [stock, isYearly]);

  const handleStockChange = (e) => setStock(e.target.value);
  const handleToggleChange = () => setIsYearly(!isYearly);

  const downloadCSV = () => {
    const rows = [['Date', 'Price'], ...graphData.labels.map((label, idx) => [label, graphData.datasets[0].data[idx]])];
    const csvContent = rows.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${stock}_${isYearly ? 'yearly' : 'daily'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">Welcome, {user?.name || 'Trader'} 👋</h2>

      {/* Stock selection and options */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <label htmlFor="stock" className="font-semibold">Select Stock:</label>
        <select
          id="stock"
          value={stock}
          onChange={handleStockChange}
          className="p-2 border rounded"
        >
          <option value="">--Select Stock--</option>
          <option value="amzn">AMZN</option>
          <option value="aapl">AAPL</option>
          <option value="goog">GOOG</option>
        </select>

        <div className="flex items-center gap-2">
          <span className="font-medium">Yearly</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={!isYearly}
              onChange={handleToggleChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600 relative" />
          </label>
          <span className="font-medium">Daily</span>
        </div>

        {/* Date Range Picker for Daily Data */}
        {!isYearly && (
          <div className="flex items-center gap-2">
            <label className="font-medium">From:</label>
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
            <label className="font-medium">To:</label>
            <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
          </div>
        )}

        {/* Button to fetch prediction */}
        <button
          onClick={fetchData}
          className="bg-red text-white px-6 py-3 rounded-md font-bold hover:bg-teal-700 transition duration-300"
        >
          🔍 Check Prediction
        </button>
      </div>

      {/* Loading and Error States */}
      {loading && <p className="text-blue-600 font-medium">Loading data...</p>}
      {error && <p className="text-red-600 font-medium">{error}</p>}

      {/* Graph and Recommendation Display */}
      {graphData && !loading && !error && (
        <div className="mt-6 space-y-4">
          <Line data={graphData} />

          {/* Recommendation Display */}
          <p className="text-xl font-semibold">
            Recommendation: <span className="font-bold">{recommendation}</span>
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm">
            <div><strong>Start Price:</strong> {graphData.datasets[0].data[0]?.toFixed(2)}</div>
            <div><strong>End Price:</strong> {graphData.datasets[0].data.at(-1)?.toFixed(2)}</div>
            <div><strong>Change:</strong> {(graphData.datasets[0].data.at(-1) - graphData.datasets[0].data[0]).toFixed(2)}</div>
            <div><strong>Change %:</strong> {(((graphData.datasets[0].data.at(-1) - graphData.datasets[0].data[0]) / graphData.datasets[0].data[0]) * 100).toFixed(2)}%</div>
          </div>

          {/* Download CSV */}
          <button
            onClick={downloadCSV}
            className="mt-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            ⬇️ Download CSV
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
