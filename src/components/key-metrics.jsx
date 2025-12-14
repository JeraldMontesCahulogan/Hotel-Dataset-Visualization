import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function KeyMetrics({ hotelData }) {
  const totalBookings = hotelData.length;

  const avgADR =
    totalBookings === 0
      ? 0
      : hotelData.reduce((sum, r) => sum + Number(r.adr || 0), 0) /
        totalBookings;

  const canceledCount = hotelData.filter(
    (r) => Number(r.is_canceled) === 1
  ).length;

  const cancellationRate =
    totalBookings === 0 ? 0 : (canceledCount / totalBookings) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-3">
          <CardDescription>Total Bookings</CardDescription>
          <CardTitle className="text-4xl font-bold">
            {totalBookings.toLocaleString()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            Filtered records
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardDescription>Average Daily Rate</CardDescription>
          <CardTitle className="text-4xl font-bold">
            ${avgADR.toFixed(2)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Based on filtered bookings
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardDescription>Cancellation Rate</CardDescription>
          <CardTitle className="text-4xl font-bold">
            {cancellationRate.toFixed(1)}%
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            {canceledCount.toLocaleString()} canceled bookings
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
