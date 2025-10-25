export const trackPageView = (path) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("config", "G-6SZY20BL2L", {
      page_path: path,
    });
  }
};

export const trackEvent = (action, category, label, value) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const measurePerformance = () => {
  if (window.performance && window.performance.timing) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    const connectTime = perfData.responseEnd - perfData.requestStart;
    const renderTime = perfData.domComplete - perfData.domLoading;

    console.log({
      pageLoadTime,
      connectTime,
      renderTime,
    });

    trackEvent("Performance", "Page Load", "Load Time", pageLoadTime);
  }
};
