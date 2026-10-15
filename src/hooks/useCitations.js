import { useState, useEffect } from 'react';

let cache = null;

export function useCitations() {
  const [citations, setCitations] = useState(cache || []);

  useEffect(() => {
    if (cache) return;
    fetch('./citations.json')
      .then(r => r.json())
      .then(d => { cache = d.citations; setCitations(d.citations); })
      .catch(() => {});
  }, []);

  const getCitation = (id) => citations.find(c => c.id === id);
  const getByTool   = (tool) => citations.filter(c => c.tools?.includes(tool));
  const getByDoc    = (slug) => citations.filter(c => c.docs?.includes(slug));

  return { citations, getCitation, getByTool, getByDoc };
}
