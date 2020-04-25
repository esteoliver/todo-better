export default (data) => {
  res.meta = {
    meta: {
      'current_page': parseInt(page),
      'total_pages': Math.ceil(data.count / pageSize)
    }
  }
}