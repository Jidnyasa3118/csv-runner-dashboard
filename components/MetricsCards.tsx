"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Metrics = {
  average: string;
  min: number;
  max: number;
};

export default function MetricsCards({ metrics }: { metrics: Metrics | null }) {
  if (!metrics) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Average</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">
          {metrics.average}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Minimum</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">
          {metrics.min}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Maximum</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">
          {metrics.max}
        </CardContent>
      </Card>
    </div>
  );
}
