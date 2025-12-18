"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function RunnerAreaChart({ data }: { data: any[] }) {
  if (!data.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overall Running Trend</CardTitle>
      </CardHeader>

      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            {/* X Axis */}
            <XAxis dataKey="date">
              <Label value="Date" position="insideBottom" offset={-5} />
            </XAxis>

            {/* Y Axis */}
            <YAxis>
              <Label
                value="Miles Run"
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: "middle" }}
              />
            </YAxis>

            <Tooltip formatter={(v) => [`${v} miles`, "Distance"]} />

            <Area
              type="monotone"
              dataKey="miles"
              stroke="#10b981"
              fill="#d1fae5"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
