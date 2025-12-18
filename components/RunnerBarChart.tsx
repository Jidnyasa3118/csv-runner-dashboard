"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function RunnerBarChart({ data }: { data: any[] }) {
  if (!data.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Miles by Runner</CardTitle>
      </CardHeader>

      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            {/* X Axis */}
            <XAxis dataKey="person">
              <Label
                value="Runner"
                position="insideBottom"
                offset={-5}
              />
            </XAxis>

            {/* Y Axis */}
            <YAxis>
              <Label
                value="Total Miles"
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: "middle" }}
              />
            </YAxis>

            <Tooltip formatter={(v) => [`${v} miles`, "Total"]} />
            <Bar dataKey="total" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
