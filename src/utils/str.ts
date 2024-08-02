function stripAccents(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '');
}

// eslint-disable-next-line import/prefer-default-export
export { stripAccents };
