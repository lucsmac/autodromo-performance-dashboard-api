export const setUpQuery = (url: string): string => {
  const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
  const targetUrl = encodeURIComponent(url)
  const key = 'AIzaSyDO-sFhtNoDGHHvnRixB54MbjxBI1iQUys'
  const category = 'performance';
  const strategy = 'mobile'

  const query = `${api}?url=${targetUrl}&key=${key}&category=${category}&strategy=${strategy}`;

  return query;
}