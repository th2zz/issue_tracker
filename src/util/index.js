export const isEmpty = (value) => (value === 0 ? false : !value);
//!!get bool value
// object is not dict
export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (isEmpty(value)) {
      // 排除value为空的情况 (value为0除外) 删掉kv
      delete result[key];
    }
  });
  return result;
};
