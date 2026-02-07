export function getProjectScreenshot(url: string): string {
  const params = new URLSearchParams({
    url: url,
    screenshot: 'true',
    'viewport.width': '1280',
    'viewport.height': '720',
    embed: 'screenshot.url',
  });
  
  return `https://api.microlink.io/?${params.toString()}`;
}