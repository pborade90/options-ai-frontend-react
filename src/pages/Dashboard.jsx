import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
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

  const BASE_URL = import.meta.env.VITE_API_BASE;

  const fetchPrediction = async (symbol) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${BASE_URL}/yearly/${symbol}`);
      const data = response.data;

      const labels = data.yearly_data.map(item => item.year);
      const closePrices = data.yearly_data.map(item => item.close);

      const chartData = {
        labels,
        datasets: [
          {
            label: `${symbol.toUpperCase()} Closing Prices`,
            data: closePrices,
            borderColor: '#c44536',
            backgroundColor: 'rgba(196, 69, 54, 0.5)',
            fill: true,
          },
        ],
      };

      setGraphData(chartData);
      setRecommendation(closePrices.at(-1) > closePrices[0] ? 'Buy' : 'Do Not Buy');
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
    fetchPrediction(stock);
  }, []);

  const handleStockChange = (e) => {
    setStock(e.target.value);
  };

  const handleFetch = () => {
    if (stock) {
      fetchPrediction(stock);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">Welcome, {user?.name || 'Trader'} 👋</h2>

      <div className="flex items-center gap-4 mb-6">
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
        <button
  onClick={handleFetch}
  className="bg-red text-white px-6 py-3 rounded-md font-bold hover:bg-teal-700 transition duration-300"
>
  🔍 Check Prediction
</button>

      </div>

      {loading && <p className="text-blue-600 font-medium">Loading data...</p>}
      {error && <p className="text-red-600 font-medium">{error}</p>}

      {graphData && !loading && !error && (
        <div className="mt-6">
          <Line data={graphData} />
          <p className="mt-4 text-xl font-semibold">
            Recommendation: <span className="font-bold">{recommendation}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
