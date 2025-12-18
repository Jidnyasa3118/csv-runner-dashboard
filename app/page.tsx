"use client";

import { useMemo, useState } from "react";
import CsvUploader from "@/components/CsvUploader";
import RunnerChart from "@/components/RunnerChart";
import MetricsCards from "@/components/MetricsCards";
import PersonFilter from "@/components/PersonFilter";
import CsvPreviewTable from "@/components/CsvPreviewTable";
import RunnerBarChart from "@/components/RunnerBarChart";
import RunnerAreaChart from "@/components/RunnerAreaChart";
import RunnerPieChart from "@/components/RunnerPieChart";
import { calculateMetrics, getLeaderboard } from "@/lib/metrics";


export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [selectedPerson, setSelectedPerson] = useState("all");
  const leaderboard = useMemo(() => getLeaderboard(data), [data]);


  // Extract unique people
  const people = useMemo(() => {
    return Array.from(new Set(data.map((d) => d.person)));
  }, [data]);

  // Filter data by person
  const filteredData = useMemo(() => {
    if (selectedPerson === "all") return data;
    return data.filter((d) => d.person === selectedPerson);
  }, [data, selectedPerson]);

  // Metrics calculation
  const overallMetrics = calculateMetrics(data);
  const personMetrics = calculateMetrics(filteredData);

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 flex flex-col items-center">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">
          🏃 CSV Runner Analytics Dashboard
        </h1>
        <p className="text-zinc-600 max-w-xl">
          Upload a running log CSV file to analyze distance trends,
          performance metrics, and runner-wise insights.
        </p>
      </div>

      {/* CSV Upload */}
      <CsvUploader onDataLoaded={setData} />

      {/* CSV Preview Table */}
      {data.length > 0 && (
        <CsvPreviewTable data={data} limit={12} />
      )}


      {/* Empty State */}
      {data.length === 0 && (
        <p className="mt-6 text-sm text-zinc-500">
          Upload a CSV file to view metrics and charts.
        </p>
      )}

      {data.length > 0 && (
        <>
          {/* Filter Section */}
          <section className="w-full max-w-3xl flex justify-start">
            <PersonFilter
              people={people}
              value={selectedPerson}
              onChange={setSelectedPerson}
            />
          </section>

          {/* Metrics Section */}
          <section className="w-full max-w-3xl mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Overall Performance Metrics
            </h2>
            <MetricsCards metrics={overallMetrics} />
          </section>

          {/* Per-Person Metrics */}
          {selectedPerson !== "all" && (
            <section className="w-full max-w-3xl mt-8">
              <h2 className="text-xl font-semibold mb-4">
                {selectedPerson}’s Performance
              </h2>
              <MetricsCards metrics={personMetrics} />
            </section>
          )}

          {/* Chart Section */}
          <section className="w-full max-w-3xl mt-10">
            <RunnerChart data={filteredData} />
          </section>
          {/* Advanced Charts Section */}
         <section className="w-full max-w-5xl mt-12 grid md:grid-cols-2 gap-6">
  <RunnerBarChart data={leaderboard} />
  <RunnerPieChart data={leaderboard} />
</section>

<section className="w-full max-w-3xl mt-12">
  <RunnerAreaChart data={filteredData} />
</section>

        </>
      )}
    </main>
  );
}
