import Papa from "papaparse";

export function parseCSV(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const data = result.data as any[];

        const requiredHeaders = ["date", "person", "miles"];
        const headers = Object.keys(data[0] || {});

        for (let h of requiredHeaders) {
          if (!headers.includes(h)) {
            reject(`Missing column: ${h}`);
          }
        }

        data.forEach((row, i) => {
          if (isNaN(Date.parse(row.date)))
            reject(`Invalid date at row ${i + 2}`);
          if (!row.person)
            reject(`Missing person at row ${i + 2}`);
          if (isNaN(Number(row.miles)))
            reject(`Invalid miles at row ${i + 2}`);
        });

        resolve(
          data.map(r => ({
            date: r.date,
            person: r.person,
            miles: Number(r.miles)
          }))
        );
      },
      error: (err) => reject(err.message),
    });
  });
}
