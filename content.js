// Average reading speed (words per minute)
const WPM = 225;

function countWords(text) {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

function getVisibleText() {
  const body = document.body;
  
  // Clone body to avoid modifying the actual page
  const clone = body.cloneNode(true);
  
  // Remove scripts, styles, and hidden elements from the clone
  const scripts = clone.querySelectorAll('script, style, noscript, iframe, svg, header, footer, nav');
  scripts.forEach(script => script.remove());
  
  // Get text content
  const text = clone.innerText || "";
  return text;
}

function calculateReadingTime() {
  const text = getVisibleText();
  const wordCount = countWords(text);
  const readingTimeMinutes = Math.ceil(wordCount / WPM);
  
  return {
    wordCount,
    readingTimeMinutes
  };
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getReadingTime") {
    const data = calculateReadingTime();
    sendResponse(data);
  }
});
