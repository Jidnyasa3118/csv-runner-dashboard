"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { parseCSV } from "@/lib/csvParser";

type CsvUploaderProps = {
  onDataLoaded: (data: any[]) => void;
};

export default function CsvUploader({ onDataLoaded }: CsvUploaderProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset state
    setError(null);
    setLoading(true);

    // Validate file type
    if (!file.name.endsWith(".csv")) {
      setError("Please upload a valid CSV file.");
      setLoading(false);
      return;
    }

    try {
      const data = await parseCSV(file);
      onDataLoaded(data);
    } catch (err: any) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Upload CSV File</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4
                     file:rounded file:border-0
                     file:text-sm file:font-semibold
                     file:bg-primary file:text-primary-foreground
                     hover:file:opacity-90"
        />

        {loading && (
          <Button disabled className="w-full">
            Processing...
          </Button>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
