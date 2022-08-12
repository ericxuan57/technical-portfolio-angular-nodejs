const _generateResponse = (
  options = {
    res: null,
    status: 200,
    data: {},
    errors: {},
    msg: "",
    success: true,
  }
) => {
  return options.res.status(options.status).json({
    success: options?.success ?? true,
    data: options?.data ?? {},
    errors: options?.errors ?? {},
    msg: options?.msg ?? "",
  });
};
exports.createOKResponse = (options) => {
  return _generateResponse({
    success: true,
    ...options,
    status: 200,
  });
};
exports.createErrorResponse = (options) => {
  return _generateResponse({
    success: false,
    ...options,
    status: options.status ?? 500,
  });
};
exports.getAllData = (data) => {
  return { totalItems: data.length, rows: data };
};
exports.getPagingData = (data, page, perPage, totalItems) => {
  const totalPages = Math.ceil(totalItems / perPage);
  const currentPage = page ? +page : 0;
  return {
    totalItems,
    items: data.length,
    totalPages,
    currentPage,
    perPage,
    rows: data,
  };
};
