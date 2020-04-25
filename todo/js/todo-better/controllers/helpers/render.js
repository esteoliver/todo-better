export default (res, serializer) => {
  res.json({
    ...((!!res.data && serializer.serialize(res.data)) || {}),
    ...(res.meta || {}),
    ...(res.errors || {})
  })
}