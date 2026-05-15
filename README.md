# HTML Table → Google Sheets Importer

Imports an HTML table stored in cell `A1` into a new Google Sheets tab.

## Setup

1. Open:
   `Extensions → Apps Script`

2. Paste the script and save.

## Usage

1. Put HTML table text into cell `A1`

Example:

```html id="7m1lzp"
<table>
  <tr><td>Hello</td><td>123</td></tr>
</table>
```

2. Run:

```javascript id="q8n3rx"
htmlTableToSheet()
```

3. A new sheet will be created containing the parsed table.

## Features

* Parses `<tr>`, `<td>`, and `<th>`
* Converts numbers automatically
* Removes HTML tags/entities
* Auto-resizes columns
