const fs = require('fs');

const tests = [
  { name: 'Home Mobile', before: 'lh-home-mobile.json', after: 'lh-home-mobile-after.json' },
  { name: 'Home Desktop', before: 'lh-home-desktop.json', after: 'lh-home-desktop-after.json' },
  { name: 'Dest (Malaysia) Mobile', before: 'lh-dest-mobile.json', after: 'lh-dest-mobile-after.json' },
  { name: 'Dest (Malaysia) Desktop', before: 'lh-dest-desktop.json', after: 'lh-dest-desktop-after.json' },
  { name: 'Service (Visa) Mobile', before: 'lh-serv-mobile.json', after: 'lh-serv-mobile-after.json' },
  { name: 'Service (Visa) Desktop', before: 'lh-serv-desktop.json', after: 'lh-serv-desktop-after.json' },
  { name: 'Blog Mobile', before: 'lh-blog-mobile.json', after: 'lh-blog-mobile-after.json' },
  { name: 'Blog Desktop', before: 'lh-blog-desktop.json', after: 'lh-blog-desktop-after.json' },
];

function getStats(file) {
  if (!fs.existsSync(file)) return { score: 'N/A', fcp: 'N/A', lcp: 'N/A', cls: 'N/A' };
  const d = JSON.parse(fs.readFileSync(file, 'utf8'));
  return {
    score: Math.round(d.categories.performance.score * 100),
    fcp: d.audits['first-contentful-paint']?.displayValue,
    lcp: d.audits['largest-contentful-paint']?.displayValue,
    cls: d.audits['cumulative-layout-shift']?.displayValue,
    tbt: d.audits['total-blocking-time']?.displayValue,
  };
}

console.log('------------------------------------------------------------------------------------------------------------------------');
console.log('Page & Route'.padEnd(26) + ' | ' + 'Score (B -> A)'.padEnd(16) + ' | ' + 'CLS (B -> A)'.padEnd(18) + ' | ' + 'LCP (B -> A)'.padEnd(18) + ' | ' + 'Target Status');
console.log('------------------------------------------------------------------------------------------------------------------------');

tests.forEach(t => {
  const b = getStats(t.before);
  const a = getStats(t.after);
  const scoreStr = b.score + ' -> ' + a.score;
  const clsStr = b.cls + ' -> ' + a.cls;
  const lcpStr = b.lcp + ' -> ' + a.lcp;
  const isDesktop = t.name.includes('Desktop');
  const targetMet = isDesktop 
    ? (a.score >= 95 && parseFloat(a.cls) < 0.1) 
    : (a.score >= 85);
  console.log(t.name.padEnd(26) + ' | ' + scoreStr.padEnd(16) + ' | ' + clsStr.padEnd(18) + ' | ' + lcpStr.padEnd(18) + ' | ' + (targetMet ? '✅ TARGET MET' : '⚠️ REVIEW'));
});
console.log('------------------------------------------------------------------------------------------------------------------------');
