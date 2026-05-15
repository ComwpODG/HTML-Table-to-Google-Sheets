function htmlTableToSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = ss.getActiveSheet();

  const html = sourceSheet.getRange("A1").getValue();

  if (!html || typeof html !== "string") {
    throw new Error("Cell A1 does not contain HTML text.");
  }

  // Create a new sheet
  const newSheet = ss.insertSheet("Imported Table " + Date.now());
  const rowMatches = [...html.matchAll(/<tr[\s\S]*?>([\s\S]*?)<\/tr>/gi)];

  const data = rowMatches.map(row => {
    const cells = [...row[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)];

    return cells.map(cell => {
      let text = cell[1];
      text = text.replace(/<[^>]+>/g, "");

      text = text
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"');

      // Trim whitespace
      text = text.trim();

      const num = Number(text);
      return isNaN(num) ? text : num;
    });
  });

  if (data.length === 0) {
    throw new Error("No table rows found in A1.");
  }

  // Write data into sheet
  newSheet
    .getRange(1, 1, data.length, Math.max(...data.map(r => r.length)))
    .setValues(data);

  // DELETE IF U DONT WANT AUTOMATICALLY SIZED COLUMNS
  newSheet.autoResizeColumns(1, data[0].length);

  SpreadsheetApp.flush();

  Logger.log("Imported " + data.length + " rows.");
}
