/**
 * components.js
 * ─────────────────────────────────────────────────────────────────
 * Reusable DOM-builder functions — converted from React JSX components.
 *
 *  SubjectCard    → createSubjectCard(subject, onExplore)
 *  SubjectDetail  → createSubjectDetail(subject, onBack)
 *  LoadingSpinner → createLoadingSpinner(color)
 *  Toast          → showToast(message)
 *
 * No frameworks, no JSX. Pure DOM APIs.
 * ─────────────────────────────────────────────────────────────────
 */

/* ── INJECT COMPONENT STYLES (runs once) ─────────────── */
(function injectComponentStyles() {
  if (document.getElementById('ep-component-styles')) return;
  const style = document.createElement('style');
  style.id = 'ep-component-styles';
  style.textContent = `

    /* ── Subject Detail overlay ── */
    #subjectDetailOverlay {
      position: fixed; inset: 0; z-index: 2000;
      background: var(--bg);
      overflow-y: auto;
      animation: detailSlideIn 0.35s cubic-bezier(0.22,1,0.36,1) both;
    }
    @keyframes detailSlideIn {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes detailSlideOut {
      from { opacity: 1; transform: translateY(0); }
      to   { opacity: 0; transform: translateY(28px); }
    }

    /* ── Detail hero banner ── */
    .detail-banner {
      padding: 56px 0 40px;
      border-bottom: 1px solid var(--border);
      position: relative; overflow: hidden;
    }
    .detail-banner-inner {
      max-width: 1100px; margin: 0 auto; padding: 0 24px;
    }
    .detail-back-btn {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--border); color: var(--text-2);
      border-radius: 100px; padding: 9px 18px;
      font-size: 0.83rem; font-weight: 600;
      cursor: pointer; margin-bottom: 28px;
      font-family: inherit; transition: all 0.2s;
    }
    .detail-back-btn:hover {
      border-color: var(--accent); color: var(--accent);
    }
    .detail-header {
      display: flex; align-items: flex-start; gap: 22px; flex-wrap: wrap;
    }
    .detail-icon-blob {
      width: 68px; height: 68px; border-radius: 20px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.8rem; flex-shrink: 0;
    }
    .detail-channel-tag {
      font-family: 'Space Mono', monospace;
      font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase;
      display: inline-flex; align-items: center; gap: 6px;
      margin-bottom: 10px;
    }
    .detail-title {
      font-size: clamp(1.8rem, 4vw, 2.6rem);
      font-weight: 800; color: var(--text-1);
      margin-bottom: 8px; letter-spacing: -0.025em; line-height: 1.15;
    }
    .detail-tagline {
      font-size: 1.05rem; font-weight: 500;
      font-style: italic; margin-bottom: 10px;
    }
    .detail-description {
      font-size: 0.95rem; color: var(--text-2);
      line-height: 1.75; max-width: 640px;
    }
    .detail-deco-blob {
      position: absolute; top: -80px; right: 10%;
      width: 300px; height: 300px; border-radius: 50%;
      filter: blur(100px); opacity: 0.08; pointer-events: none;
    }

    /* ── Detail body ── */
    .detail-body {
      max-width: 1100px; margin: 0 auto;
      padding: 48px 24px;
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 40px; align-items: start;
    }
    @media (max-width: 768px) {
      .detail-body { grid-template-columns: 1fr; }
    }

    /* ── Topics card ── */
    .topics-card {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: 20px; padding: 32px; margin-bottom: 20px;
    }
    .topics-card-header {
      display: flex; align-items: center; gap: 12px; margin-bottom: 22px;
    }
    .topics-icon-wrap {
      width: 36px; height: 36px; border-radius: 10px;
      display: flex; align-items: center; justify-content: center; font-size: 1rem;
    }
    .topics-card h2 {
      font-size: 1.1rem; font-weight: 700; color: var(--text-1);
    }
    .topic-item {
      display: flex; align-items: flex-start; gap: 12px;
      padding: 12px 14px; background: rgba(255,255,255,0.02);
      border-radius: 10px; border: 1px solid var(--border);
      margin-bottom: 10px;
      animation: topicIn 0.4s ease both;
    }
    @keyframes topicIn {
      from { opacity: 0; transform: translateX(-14px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    .topic-check { font-size: 0.9rem; flex-shrink: 0; margin-top: 1px; }
    .topic-text { font-size: 0.87rem; color: var(--text-2); line-height: 1.5; }

    /* ── Pro tip ── */
    .pro-tip {
      border-radius: 16px; padding: 18px 22px;
      display: flex; gap: 14px; align-items: flex-start;
    }
    .pro-tip-emoji { font-size: 1.3rem; flex-shrink: 0; }
    .pro-tip-label {
      font-family: 'Space Mono', monospace;
      font-size: 0.65rem; letter-spacing: 0.1em;
      text-transform: uppercase; margin-bottom: 4px; display: block;
    }
    .pro-tip-text { font-size: 0.83rem; color: var(--text-2); line-height: 1.6; }

    /* ── Video panel ── */
    .video-panel {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: 20px; overflow: hidden;
      position: sticky; top: 80px;
    }
    .video-thumb {
      position: relative; aspect-ratio: 16/9;
      background: #0a0a0f; overflow: hidden;
      cursor: pointer;
    }
    .video-thumb-bg {
      position: absolute; inset: 0;
      background-image: radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px);
      background-size: 22px 22px;
    }
    .video-play-btn {
      position: absolute; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 68px; height: 68px; border-radius: 50%;
      background: rgba(255,0,0,0.9);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.2rem;
      box-shadow: 0 8px 32px rgba(255,0,0,0.4);
      transition: transform 0.2s;
    }
    .video-thumb:hover .video-play-btn { transform: translate(-50%, -50%) scale(1.1); }
    .video-thumb-label {
      position: absolute; bottom: 14px; left: 14px;
      font-family: 'Space Mono', monospace; font-size: 0.65rem;
      color: rgba(255,255,255,0.55); letter-spacing: 0.05em;
    }
    .video-thumb-click-hint {
      position: absolute; top: 50%; left: 50%;
      transform: translate(-50%, calc(-50% + 52px));
      font-family: 'Space Mono', monospace; font-size: 0.7rem;
      color: rgba(255,255,255,0.5); white-space: nowrap;
    }
    .video-iframe-wrap {
      position: relative; aspect-ratio: 16/9; background: #0a0a0f;
    }
    .video-iframe-wrap iframe {
      position: absolute; inset: 0; width: 100%; height: 100%; border: none;
    }
    .video-loading-wrap {
      position: absolute; inset: 0; z-index: 2;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      background: #0a0a0f; gap: 10px;
    }
    .video-spinner {
      width: 34px; height: 34px; border-radius: 50%;
      border: 3px solid rgba(255,255,255,0.1);
      border-top-color: var(--accent);
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .video-spinner-text {
      font-family: 'Space Mono', monospace; font-size: 0.7rem;
      color: rgba(255,255,255,0.35);
    }
    .video-meta { padding: 18px 20px; }
    .video-meta-title {
      font-size: 0.92rem; font-weight: 700; color: var(--text-1);
      line-height: 1.4; margin-bottom: 12px;
    }
    .video-channel-row {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 14px; background: rgba(255,0,0,0.06);
      border-radius: 10px; border: 1px solid rgba(255,0,0,0.12);
    }
    .video-yt-icon { font-size: 1rem; flex-shrink: 0; }
    .video-channel-name { font-size: 0.78rem; font-weight: 600; color: var(--text-1); }
    .video-channel-note { font-size: 0.7rem; color: var(--text-3); }
    .video-verified-badge {
      margin-left: auto; font-family: 'Space Mono', monospace;
      font-size: 0.58rem; color: #06d6a0;
      padding: 2px 8px; background: rgba(6,214,160,0.08);
      border-radius: 100px; border: 1px solid rgba(6,214,160,0.2);
      letter-spacing: 0.06em; text-transform: uppercase; flex-shrink: 0;
    }
    .video-ext-link {
      display: inline-flex; align-items: center; gap: 5px;
      font-size: 0.75rem; color: var(--text-3); text-decoration: none;
      float: right; transition: color 0.2s; margin-top: -26px;
    }
    .video-ext-link:hover { color: #ff4444; }

    /* ── Enhanced subject card ── */
    .ep-subject-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 20px; padding: 28px;
      cursor: pointer; position: relative; overflow: hidden;
      transition: transform 0.32s cubic-bezier(0.34,1.56,0.64,1),
                  border-color 0.28s ease,
                  box-shadow 0.28s ease;
    }
    .ep-subject-card:hover {
      transform: translateY(-6px);
    }
    .ep-card-top-line {
      position: absolute; top: 0; left: 0; right: 0; height: 2px;
      opacity: 0; transition: opacity 0.25s;
    }
    .ep-subject-card:hover .ep-card-top-line { opacity: 1; }
    .ep-card-spotlight {
      position: absolute; inset: 0; pointer-events: none;
      opacity: 0; transition: opacity 0.2s;
      border-radius: 20px;
    }
    .ep-subject-card:hover .ep-card-spotlight { opacity: 1; }
    .ep-card-icon {
      width: 52px; height: 52px; border-radius: 14px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.5rem; margin-bottom: 18px;
      transition: transform 0.32s cubic-bezier(0.34,1.56,0.64,1);
    }
    .ep-subject-card:hover .ep-card-icon {
      transform: scale(1.1) rotate(-5deg);
    }
    .ep-card-title {
      font-size: 1rem; font-weight: 700; color: var(--text-1);
      margin-bottom: 10px; line-height: 1.3;
    }
    .ep-card-desc {
      font-size: 0.83rem; color: var(--text-2); line-height: 1.65;
      margin-bottom: 22px;
      display: -webkit-box; -webkit-line-clamp: 3;
      -webkit-box-orient: vertical; overflow: hidden;
    }
    .ep-card-btn {
      display: inline-flex; align-items: center; gap: 7px;
      border-radius: 100px; padding: 8px 18px;
      font-size: 0.8rem; font-weight: 600; cursor: pointer;
      transition: background 0.22s, color 0.22s, gap 0.22s;
      font-family: inherit; letter-spacing: 0.02em; border-width: 1.5px;
      border-style: solid;
    }
    .ep-card-btn:hover { gap: 11px; }
    .ep-card-btn-arrow { transition: transform 0.22s; }
    .ep-subject-card:hover .ep-card-btn-arrow { transform: translateX(3px); }

    /* ── Toast ── */
    .ep-toast {
      position: fixed; bottom: 80px; right: 28px; z-index: 9999;
      background: var(--bg-card); border: 1px solid rgba(79,142,247,0.4);
      color: var(--text-1); padding: 14px 20px;
      border-radius: 12px; font-size: 0.85rem;
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      font-family: 'DM Sans', sans-serif;
      animation: toastIn 0.3s ease; max-width: 320px;
    }
    @keyframes toastIn  { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
    @keyframes toastOut { from { opacity:1; transform:translateY(0); }   to { opacity:0; transform:translateY(12px); } }
  `;
  document.head.appendChild(style);
})();


/* ═══════════════════════════════════════════════════════════
   createSubjectCard(subject, onExplore)
   Returns a DOM element — the enhanced subject card.
   Replaces the old plain innerHTML card with hover spotlight.
   ═══════════════════════════════════════════════════════════ */
function createSubjectCard(subject, onExplore) {
  const card = document.createElement('div');
  card.className = 'ep-subject-card';
  card.setAttribute('data-subject-id', subject.id);

  // top accent line
  const topLine = document.createElement('div');
  topLine.className = 'ep-card-top-line';
  topLine.style.background = `linear-gradient(90deg, ${subject.accentColor}, transparent)`;
  card.appendChild(topLine);

  // spotlight (follows mouse)
  const spotlight = document.createElement('div');
  spotlight.className = 'ep-card-spotlight';
  card.appendChild(spotlight);

  // icon
  const iconWrap = document.createElement('div');
  iconWrap.className = 'ep-card-icon';
  iconWrap.style.cssText = `background:${subject.accentBg}; border:1px solid ${subject.accentColor}30;`;
  iconWrap.textContent = subject.icon;
  card.appendChild(iconWrap);

  // title
  const title = document.createElement('div');
  title.className = 'ep-card-title';
  title.textContent = subject.title;
  card.appendChild(title);

  // description
  const desc = document.createElement('div');
  desc.className = 'ep-card-desc';
  desc.textContent = subject.description;
  card.appendChild(desc);

  // explore button
  const btn = document.createElement('button');
  btn.className = 'ep-card-btn';
  btn.style.cssText = `color:${subject.accentColor}; border-color:${subject.accentColor}; background:transparent;`;
  btn.innerHTML = `Explore <span class="ep-card-btn-arrow">→</span>`;
  card.appendChild(btn);

  /* ── Events ── */

  // Mouse move → spotlight gradient
  card.addEventListener('mousemove', function (e) {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    spotlight.style.background = `radial-gradient(circle 180px at ${x}% ${y}%, ${subject.accentColor}14, transparent 70%)`;
  });

  // Mouse enter → border + shadow
  card.addEventListener('mouseenter', function () {
    card.style.borderColor = subject.accentColor + '60';
    card.style.boxShadow = `0 16px 48px ${subject.accentColor}22, 0 4px 16px rgba(0,0,0,0.3)`;
    btn.style.background = subject.accentColor;
    btn.style.color = '#fff';
  });

  card.addEventListener('mouseleave', function () {
    card.style.borderColor = '';
    card.style.boxShadow = '';
    btn.style.background = 'transparent';
    btn.style.color = subject.accentColor;
  });

  // Explore click
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (typeof onExplore === 'function') onExplore(subject);
  });

  card.addEventListener('click', function () {
    if (typeof onExplore === 'function') onExplore(subject);
  });

  return card;
}


/* ═══════════════════════════════════════════════════════════
   createSubjectDetail(subject, onBack)
   Returns a full-screen overlay DOM element with:
   - Banner with back button
   - Topics checklist
   - Sticky video panel with lazy iframe loading
   ═══════════════════════════════════════════════════════════ */
function createSubjectDetail(subject, onBack) {
  const overlay = document.createElement('div');
  overlay.id = 'subjectDetailOverlay';

  /* ── inner scroll container ── */
  const inner = document.createElement('div');
  inner.style.cssText = 'min-height:100vh; padding-top:68px;';

  /* ─────────────────────────────
     BANNER
  ───────────────────────────── */
  const banner = document.createElement('div');
  banner.className = 'detail-banner';
  banner.style.background = `linear-gradient(135deg, ${subject.accentColor}14 0%, transparent 60%), var(--bg-2)`;

  // deco blob
  const decoBlob = document.createElement('div');
  decoBlob.className = 'detail-deco-blob';
  decoBlob.style.background = subject.accentColor;
  banner.appendChild(decoBlob);

  const bannerInner = document.createElement('div');
  bannerInner.className = 'detail-banner-inner';

  // Back button
  const backBtn = document.createElement('button');
  backBtn.className = 'detail-back-btn';
  backBtn.innerHTML = '← Back to Subjects';
  backBtn.addEventListener('click', function () {
    overlay.style.animation = 'detailSlideOut 0.28s ease forwards';
    setTimeout(function () {
      if (typeof onBack === 'function') onBack();
    }, 270);
  });
  bannerInner.appendChild(backBtn);

  // Header row
  const headerRow = document.createElement('div');
  headerRow.className = 'detail-header';

  // Icon blob
  const iconBlob = document.createElement('div');
  iconBlob.className = 'detail-icon-blob';
  iconBlob.style.cssText = `background:${subject.accentBg}; border:1.5px solid ${subject.accentColor}40;`;
  iconBlob.textContent = subject.icon;
  headerRow.appendChild(iconBlob);

  // Text block
  const textBlock = document.createElement('div');
  textBlock.style.flex = '1';

  const channelTag = document.createElement('span');
  channelTag.className = 'detail-channel-tag';
  channelTag.style.color = subject.accentColor;
  channelTag.innerHTML = `✦ ${subject.channelName}`;
  textBlock.appendChild(channelTag);

  const h1 = document.createElement('h1');
  h1.className = 'detail-title';
  h1.textContent = subject.title;
  textBlock.appendChild(h1);

  const tagline = document.createElement('p');
  tagline.className = 'detail-tagline';
  tagline.style.color = subject.accentColor;
  tagline.textContent = `"${subject.tagline}"`;
  textBlock.appendChild(tagline);

  const desc = document.createElement('p');
  desc.className = 'detail-description';
  desc.textContent = subject.description;
  textBlock.appendChild(desc);

  headerRow.appendChild(textBlock);
  bannerInner.appendChild(headerRow);
  banner.appendChild(bannerInner);
  inner.appendChild(banner);

  /* ─────────────────────────────
     BODY (two-column grid)
  ───────────────────────────── */
  const body = document.createElement('div');
  body.className = 'detail-body';

  /* ── Left column ── */
  const leftCol = document.createElement('div');

  // Topics card
  const topicsCard = document.createElement('div');
  topicsCard.className = 'topics-card';

  const topicsHeader = document.createElement('div');
  topicsHeader.className = 'topics-card-header';

  const topicsIconWrap = document.createElement('div');
  topicsIconWrap.className = 'topics-icon-wrap';
  topicsIconWrap.style.background = subject.accentBg;
  topicsIconWrap.textContent = '📖';
  topicsHeader.appendChild(topicsIconWrap);

  const topicsH2 = document.createElement('h2');
  topicsH2.textContent = "What You'll Learn";
  topicsHeader.appendChild(topicsH2);
  topicsCard.appendChild(topicsHeader);

  // Topic items with staggered animation
  subject.topics.forEach(function (topic, i) {
    const item = document.createElement('div');
    item.className = 'topic-item';
    item.style.animationDelay = (0.08 + i * 0.06) + 's';

    const check = document.createElement('span');
    check.className = 'topic-check';
    check.style.color = subject.accentColor;
    check.textContent = '✓';
    item.appendChild(check);

    const text = document.createElement('span');
    text.className = 'topic-text';
    text.textContent = topic;
    item.appendChild(text);

    topicsCard.appendChild(item);
  });
  leftCol.appendChild(topicsCard);

  // Pro tip card
  const proTip = document.createElement('div');
  proTip.className = 'pro-tip';
  proTip.style.cssText = `background:${subject.accentBg}; border:1px solid ${subject.accentColor}25;`;

  proTip.innerHTML = `
    <span class="pro-tip-emoji">💡</span>
    <div>
      <span class="pro-tip-label" style="color:${subject.accentColor}">Pro Tip</span>
      <p class="pro-tip-text">Watch the video lecture first, then revisit the topics with notes.
      Solve at least 5 practice problems per topic before moving ahead.</p>
    </div>`;
  leftCol.appendChild(proTip);
  body.appendChild(leftCol);

  /* ── Right column: Video panel ── */
  const rightCol = document.createElement('div');
  const videoPanel = document.createElement('div');
  videoPanel.className = 'video-panel';

  /* Video thumbnail (shown before user clicks play) */
  const thumbArea = document.createElement('div');
  thumbArea.className = 'video-thumb';
  thumbArea.style.background = `linear-gradient(135deg, ${subject.accentColor}18, #0a0a0f)`;

  const thumbBg = document.createElement('div');
  thumbBg.className = 'video-thumb-bg';
  thumbArea.appendChild(thumbBg);

  const playBtn = document.createElement('div');
  playBtn.className = 'video-play-btn';
  playBtn.innerHTML = '▶';
  thumbArea.appendChild(playBtn);

  const thumbLabel = document.createElement('div');
  thumbLabel.className = 'video-thumb-label';
  thumbLabel.textContent = subject.playlistTitle;
  thumbArea.appendChild(thumbLabel);

  const clickHint = document.createElement('div');
  clickHint.className = 'video-thumb-click-hint';
  clickHint.textContent = 'Click to play';
  thumbArea.appendChild(clickHint);

  /* On click → replace thumbnail with iframe */
  thumbArea.addEventListener('click', function () {
    thumbArea.style.display = 'none';

    const iframeWrap = document.createElement('div');
    iframeWrap.className = 'video-iframe-wrap';

    // loading spinner
    const loadingWrap = document.createElement('div');
    loadingWrap.className = 'video-loading-wrap';
    loadingWrap.innerHTML = `
      <div class="video-spinner" style="border-top-color:${subject.accentColor}"></div>
      <span class="video-spinner-text">Loading video…</span>`;
    iframeWrap.appendChild(loadingWrap);

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${subject.youtubeId}?autoplay=1&rel=0&modestbranding=1`;
    iframe.title = subject.playlistTitle;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.style.opacity = '0';
    iframe.style.transition = 'opacity 0.4s';
    iframe.addEventListener('load', function () {
      loadingWrap.remove();
      iframe.style.opacity = '1';
    });
    iframeWrap.appendChild(iframe);

    // Insert iframe wrap right after thumb area
    videoPanel.insertBefore(iframeWrap, videoPanel.querySelector('.video-meta'));
  });

  videoPanel.appendChild(thumbArea);

  /* Video meta area */
  const videoMeta = document.createElement('div');
  videoMeta.className = 'video-meta';

  const metaTitle = document.createElement('div');
  metaTitle.className = 'video-meta-title';
  metaTitle.textContent = subject.playlistTitle;

  // external link
  const extLink = document.createElement('a');
  extLink.className = 'video-ext-link';
  extLink.href = `https://www.youtube.com/watch?v=${subject.youtubeId}`;
  extLink.target = '_blank';
  extLink.rel = 'noopener noreferrer';
  extLink.innerHTML = '↗ YouTube';
  metaTitle.appendChild(extLink);

  videoMeta.appendChild(metaTitle);

  // Channel row
  const channelRow = document.createElement('div');
  channelRow.className = 'video-channel-row';
  channelRow.innerHTML = `
    <span class="video-yt-icon">▶️</span>
    <div>
      <div class="video-channel-name">${subject.channelName}</div>
      <div class="video-channel-note">${subject.channelNote}</div>
    </div>
    <span class="video-verified-badge">✓ Verified</span>`;
  videoMeta.appendChild(channelRow);
  videoPanel.appendChild(videoMeta);

  rightCol.appendChild(videoPanel);
  body.appendChild(rightCol);
  inner.appendChild(body);
  overlay.appendChild(inner);

  return overlay;
}


/* ═══════════════════════════════════════════════════════════
   showToast(message)
   Shows a temporary notification at bottom-right.
   ═══════════════════════════════════════════════════════════ */
function showToast(message) {
  // Remove any existing toast
  const existing = document.querySelector('.ep-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'ep-toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(function () {
    toast.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(function () { toast.remove(); }, 300);
  }, 2800);
}
