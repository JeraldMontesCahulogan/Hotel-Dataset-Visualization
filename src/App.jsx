import { useEffect, useMemo, useState } from "react";
import Header from "./components/header";
import Filter from "./components/filter";
import KeyMetrics from "./components/key-metrics";
import { MonthlyBookings } from "./components/charts/monthly-booking";
import MonthlyBookingsAll from "./components/charts/monthly-booking-all";
import { ADR } from "./components/charts/adr";
import { CustomerType } from "./components/charts/custormer-type";
import { CancellationRate } from "./components/charts/cancellation-rate";
import { TopTenCountries } from "./components/charts/top-ten-countries";
import { Loading } from "./components/loading";

function App() {
  const [rawData, setRawData] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [startMonth, setStartMonth] = useState(1);
  const [endMonth, setEndMonth] = useState(12);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch("/public/data/hotel_bookings_clean.json")
    fetch("/data/hotel_bookings_clean.json") // correct path
      .then((res) => res.json())
      .then((data) => {
        setRawData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const hotelData = useMemo(() => {
    return rawData.filter((row) => {
      const hotelMatch = selectedHotel === "all" || row.hotel === selectedHotel;

      const yearMatch =
        selectedYear === "all" ||
        Number(row.arrival_date_year) === Number(selectedYear);

      const monthNumber =
        new Date(`${row.arrival_date_month} 1, 2000`).getMonth() + 1;

      const monthMatch = monthNumber >= startMonth && monthNumber <= endMonth;

      return hotelMatch && yearMatch && monthMatch;
    });
  }, [rawData, selectedHotel, selectedYear, startMonth, endMonth]);

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto px-6 py-8">
          <Filter
            selectedHotel={selectedHotel}
            setSelectedHotel={setSelectedHotel}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            startMonth={startMonth}
            setStartMonth={setStartMonth}
            endMonth={endMonth}
            setEndMonth={setEndMonth}
            rawData={rawData}
          />

          <KeyMetrics hotelData={hotelData} />

          <div className="container mx-auto mb-8">
            {selectedHotel === "all" ? (
              <MonthlyBookingsAll
                hotelData={hotelData}
                startMonth={startMonth}
                endMonth={endMonth}
              />
            ) : (
              <MonthlyBookings
                hotelData={hotelData}
                selectedHotel={selectedHotel}
              />
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ADR hotelData={hotelData} />

            <CustomerType hotelData={hotelData} />

            <CancellationRate hotelData={hotelData} />

            <TopTenCountries hotelData={hotelData} />
          </div>

          {/* Use hotelData for charts */}
          {/* Example: <Chart data={hotelData} /> */}
        </div>
      )}
    </div>
  );
}

export default App;
