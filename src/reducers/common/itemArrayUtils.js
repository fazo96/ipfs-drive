export function updateSingleItem(existingLinks, analysis){
  return existingLinks.map(f => {
    if (f.hash === analysis.hash) {
      return Object.assign({}, f, analysis);
    }
    return f;
  });
}

export function updateWholeArray(existing, newInfo){
  return existing.map((f, i) => {
      return Object.assign({}, f, newInfo[i]);
  });
}
