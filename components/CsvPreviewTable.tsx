"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  data: any[];
  limit?: number;
};

export default function CsvPreviewTable({ data, limit = 10 }: Props) {
  if (data.length === 0) return null;

  const previewData = data.slice(0, limit);

  return (
    <Card className="w-full max-w-4xl mt-8">
      <CardHeader>
        <CardTitle>CSV Preview</CardTitle>
        <p className="text-sm text-muted-foreground">
          Showing first {previewData.length} rows
        </p>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Runner</TableHead>
              <TableHead>Miles</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {previewData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.person}</TableCell>
                <TableCell>{row.miles}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
