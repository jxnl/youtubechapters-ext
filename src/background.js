chrome.action.onClicked.addListener((tab) => {
  const url = new URL(tab.url);
  const videoId = url.searchParams.get("v");
  const magicUrl = `https://magic.jxnl.co/youtube?v=${videoId}`;

  chrome.tabs.create({ url: magicUrl });
});
