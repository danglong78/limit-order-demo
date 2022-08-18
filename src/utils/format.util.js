const formatter = Intl.NumberFormat('en', {
  notation: 'compact',
  compactDisplay: 'long',
});

export function numberWithCommas(x) {
  return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatNumberWithNotation(x) {
  return x && formatter.format(x);
}
