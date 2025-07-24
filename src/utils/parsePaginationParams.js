function parseNumber(number, defaultValue) {
  if (typeof number === 'undefined') {
    return defaultValue;
  }

  const parsedValue = parseInt(number);

  if (Number.isNaN(parsedValue) === true) {
    return defaultValue;
  }

  return parsedValue;
}

export function parsePaginationParams(query) {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
}
