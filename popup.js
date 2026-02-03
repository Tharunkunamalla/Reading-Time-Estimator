document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const result = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const timeValue = document.getElementById('time-value');
    const wordCountValue = document.getElementById('word-count');

    function showError() {
        loader.classList.add('hidden');
        result.classList.add('hidden');
        errorDiv.classList.remove('hidden');
    }

    function showResult(minutes, words) {
        loader.classList.add('hidden');
        errorDiv.classList.add('hidden');
        result.classList.remove('hidden');

        // Animate numbers
        animateValue(timeValue, 0, minutes, 1500);
        wordCountValue.textContent = words.toLocaleString();
    }

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Ease out quart
             const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            obj.innerHTML = Math.floor(easeOutQuart * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Query the active tab
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0]) {
            // Check if we can inject script (might be restricted page like chrome://)
            if (tabs[0].url.startsWith('chrome://') || tabs[0].url.startsWith('edge://') || tabs[0].url.startsWith('about:')) {
                showError();
                return;
            }

            // We are using content_scripts in manifest, but we can also use scripting API to be safe or if permissions are issue
            // For now, assume content script is loaded. 
            // We'll add a timeout/fallback if no response.
            
            let responded = false;
            
            chrome.tabs.sendMessage(tabs[0].id, {action: "getReadingTime"}, (response) => {
                responded = true;
                if (chrome.runtime.lastError) {
                    // Content script might not be injected yet (e.g. if installed without reload)
                    // Try to inject it programmatically
                   injectAndRetry(tabs[0].id);
                } else if (response) {
                    const minutes = response.readingTimeMinutes === 0 && response.wordCount > 0 ? 1 : response.readingTimeMinutes;
                    showResult(minutes, response.wordCount);
                } else {
                     showError();
                }
            });
        }
    });

    function injectAndRetry(tabId) {
         chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ['content.js']
        }, () => {
            if (chrome.runtime.lastError) {
                console.error("Injection failed: ", chrome.runtime.lastError);
                showError();
                return;
            }
            // Retry message
             chrome.tabs.sendMessage(tabId, {action: "getReadingTime"}, (response) => {
                 if (response) {
                    const minutes = response.readingTimeMinutes === 0 && response.wordCount > 0 ? 1 : response.readingTimeMinutes;
                    showResult(minutes, response.wordCount);
                 } else {
                     showError();
                 }
             });
        });
    }
});
