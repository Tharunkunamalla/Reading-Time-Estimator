# Reading Time Estimator

A beautiful browser extension that estimates the time required to read the current webpage, helping you make informed decisions about your reading list.

## Features

- **Instant Reading Time Calculation**: Get accurate reading time estimates based on the average reading speed of 225 words per minute
- **Word Count Display**: See the total word count of the page content
- **Beautiful Modern UI**: Sleek glass-morphism design with smooth animations
- **Smart Content Detection**: Automatically filters out navigation, scripts, and other non-content elements
- **Works on Most Pages**: Compatible with the vast majority of websites (restrictions apply to browser internal pages)

## Installation

### From Source

1. Clone this repository:
   ```bash
   git clone https://github.com/Tharunkunamalla/Reading-Time-Estimator.git
   cd Reading-Time-Estimator
   ```

2. Open your browser (Chrome, Edge, or other Chromium-based browsers)

3. Navigate to the extensions page:
   - **Chrome**: `chrome://extensions/`
   - **Edge**: `edge://extensions/`

4. Enable "Developer mode" (usually a toggle in the top right corner)

5. Click "Load unpacked" and select the extension directory

6. The Reading Time Estimator extension is now installed!

## Usage

1. Navigate to any webpage you want to read
2. Click the Reading Time Estimator icon in your browser toolbar
3. The extension will display:
   - Estimated reading time in minutes
   - Total word count of the page

### Note on Restricted Pages

The extension cannot access browser internal pages like:
- `chrome://` or `edge://` URLs
- `about:` pages
- Some browser settings pages

## How It Works

The extension uses the following approach:

1. **Content Extraction**: A content script (`content.js`) clones the page body and removes non-content elements (scripts, styles, navigation, etc.)
2. **Word Counting**: Extracts visible text and counts words by splitting on whitespace
3. **Reading Time Calculation**: Divides word count by 225 WPM (average reading speed) and rounds up to the nearest minute
4. **Display**: Shows results in an animated, visually appealing popup interface

## Technical Details

### Files Structure

- `manifest.json` - Extension configuration and permissions
- `content.js` - Content script for analyzing webpage content
- `popup.html` - Popup interface HTML
- `popup.js` - Popup logic and animations
- `styles.css` - Modern UI styling with glass-morphism effects
- `assets/` - Extension icons

### Key Technologies

- **Manifest V3**: Uses the latest Chrome extension manifest version
- **Content Scripts**: Automatically injected on all pages
- **Chrome APIs**: Utilizes `chrome.tabs`, `chrome.runtime`, and `chrome.scripting`
- **Responsive Design**: Custom CSS with animations and modern design patterns

### Reading Speed

The extension uses an average reading speed of **225 words per minute**, which is a commonly accepted average for English text. This can be adjusted in `content.js` by modifying the `WPM` constant.

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a new branch for your feature (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Ideas for Contributions

- Add customizable reading speed settings
- Support for multiple languages with different average speeds
- Dark/light theme toggle
- Reading time history/statistics
- Export reading time data
- Improved content detection algorithms

## License

This project is open source and available under the MIT License.

## Author

Tharun Kunamalla

## Acknowledgments

- Reading speed statistics based on commonly accepted averages
- UI design inspired by modern glass-morphism trends
- Built with ❤️ for readers everywhere
