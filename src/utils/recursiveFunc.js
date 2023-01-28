import { mapValues, isPlainObject, isArray } from 'lodash';

const recursiveFunc = (map) => {
  const deeplyArray = (obj, fn) => (
    obj.map(x => (
      isPlainObject(x) ? recursiveFunc(map)(x, fn) : x
    ))
  );

  return (obj, fn) => {
    if (isArray(obj)) {
      return deeplyArray(obj, fn);
    }

    return map(mapValues(obj, v => (
      // eslint-disable-next-line
      isPlainObject(v) ? recursiveFunc(map)(v, fn) : isArray(v) ? deeplyArray(v, fn) : v
    )), fn);
  };
};

export default recursiveFunc;