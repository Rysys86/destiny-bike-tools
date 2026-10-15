import { useState, useEffect } from 'react';

let indexCache = null;
const docCache = {};

export function useStandardsDocs() {
  const [index, setIndex] = useState(indexCache);
  const [loading, setLoading] = useState(!indexCache);

  useEffect(() => {
    if (indexCache) return;
    fetch('./docs/index.json')
      .then(r => r.json())
      .then(d => { indexCache = d; setIndex(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const fetchDoc = async (slug) => {
    if (docCache[slug]) return docCache[slug];
    const r = await fetch(`./docs/${slug}.md`);
    if (!r.ok) return '# Not found\nDoc not available.';
    const text = await r.text();
    docCache[slug] = text;
    return text;
  };

  // Flatten all docs for search
  const allDocs = index?.categories?.flatMap(c => c.docs.map(d => ({ ...d, category: c.id, categoryLabel: c.label }))) || [];

  return { index, loading, fetchDoc, allDocs };
}
