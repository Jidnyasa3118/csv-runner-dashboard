"use client";

export const Table = ({ children }: { children: React.ReactNode }) => (
  <table className="w-full border-collapse text-sm">{children}</table>
);

export const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-gray-100 dark:bg-gray-800">{children}</thead>
);

export const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody>{children}</tbody>
);

export const TableRow = ({ children }: { children: React.ReactNode }) => (
  <tr className="border-b dark:border-gray-700">{children}</tr>
);

export const TableHead = ({ children }: { children: React.ReactNode }) => (
  <th className="p-2 text-left font-semibold">{children}</th>
);

export const TableCell = ({ children }: { children: React.ReactNode }) => (
  <td className="p-2">{children}</td>
);
