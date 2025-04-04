# Relative Time Converter

Relative Time Converter is a Chrome extension that converts relative time expressions (e.g., `now + 2 days`) into absolute timestamps in epoch time format.

## Features

- Convert relative time expressions like `now + 2 days` or `now + 3 hours` into epoch timestamps.
- Supports various time units such as seconds, minutes, hours, days, months, and years.
- Simple and user-friendly interface.

## Installation

1. Clone or download this repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top-right corner.
4. Click on **Load unpacked** and select the folder containing this project.

## Usage

1. Click on the extension icon in the Chrome toolbar to open the popup.
2. Enter a relative time expression in the input field (e.g., `now + 2 days`).
3. The corresponding epoch timestamp will appear in the output field.

## Supported Formats

- `now`: Returns the current epoch time.
- `now + <value> <unit>`: Adds the specified value and unit to the current time.
  - Supported units:
    - `second(s)` or `s`
    - `minute(s)` or `min` or `m`
    - `hour(s)` or `h`
    - `day(s)` or `d`
    - `month(s)`
    - `year(s)` or `y`

## File Structure

- `manifest.json`: Defines the Chrome extension's metadata and configuration.
- `popup.html`: The HTML file for the extension's popup interface.
- `popup.js`: Contains the logic for parsing relative time expressions and converting them to epoch timestamps.

## Example Inputs

| Input               | Output (Epoch Time) |
|---------------------|----------------------|
| `now`               | Current epoch time  |
| `now + 2 days`      | Epoch time 2 days from now |
| `now + 3 hours`     | Epoch time 3 hours from now |
| `now + 1 year`      | Epoch time 1 year from now |

## Development

To modify or enhance the extension:

1. Edit the `popup.js` file to update the logic.
2. Edit the `popup.html` file to update the UI.
3. Reload the extension in Chrome by navigating to `chrome://extensions/` and clicking the **Reload** button.

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute it.

---
**Author**: Gaurav Chauhan