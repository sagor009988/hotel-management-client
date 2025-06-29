import { Chart } from "react-google-charts";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
// export const data = [
//   ['Day', 'Sales'],
//   ['9', 1000],
//   ['10', 1170],
//   ['11', 660],
//   ['12', 1030],
// ]

export const options = {
  title: "Sales Over Time",
  curveType: "function",
  legend: { position: "bottom" },
  series: [{ color: "#F43F5E" }],
};
const SalesLineChart = ({ data, isLoading }) => {
  return (
    <div>
      {data?.length > 1 ? (
        <Chart
          chartType="LineChart"
          width="100%"
          data={data}
          options={options}
        />
      ) : (
        "No data available"
      )}
    </div>
  );
};

export default SalesLineChart;
