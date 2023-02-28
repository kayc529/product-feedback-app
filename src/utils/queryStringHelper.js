export const getQueryString = (searchParams) => {
  const s = searchParams.get('s');
  const c = searchParams.get('c');
  const p = searchParams.get('p');
  let queryStr = '';

  if (s) {
    queryStr += `s=${s}`;
  }

  if (c) {
    queryStr += queryStr.length > 0 ? `&c=${c}` : `c=${c}`;
  }

  if (p) {
    queryStr += queryStr.length > 0 ? `&p=${p}` : `p=${p}`;
  }

  return queryStr;
};

export const getSearchParamsObject = (searchParams) => {
  const s = searchParams.get('s');
  const c = searchParams.get('c');
  const p = searchParams.get('p');
  let obj = {};

  if (s) {
    obj.s = s;
  }

  if (c) {
    obj.c = c;
  }

  if (p) {
    obj.p = p;
  }

  return obj;
};
