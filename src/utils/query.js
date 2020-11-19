import { isObject, isArray, compact } from "lodash";

const operators = {
  eq: "=",
  ne: "!=",
  gt: ">",
  gte: ">=",
  lt: "<",
  lte: "<=",
};

const operatorsList = Object.keys(operators);

export const buildQuery = (query) => {
  const result = Object.keys(query)
    .map((key) => {
      let value = query[key];

      // if value is array, e.g [{ gte: value1 }, { lte: value2 }]
      if (isArray(value)) {
        let values = value.map((el) => {
          const op = Object.keys(el)[0];
          let val = Object.values(el)[0];
          if (isObject(val)) {
            val = JSON.stringify(val);
          }

          if (Object.keys(el).length && operatorsList.includes(op)) {
            return `${key}${operators[op]}${val}`;
          }

          return "";
        });

        values = compact(values);

        return values.join("&");
      } else if (isObject(value)) {
        // if value is object, e.g { gte: value1 }
        const op = Object.keys(value)[0];
        const val = Object.values(value)[0];

        if (Object.keys(value).length && operatorsList.includes(op)) {
          return `${key}${operators[op]}${val}`;
        }
      }

      return `${key}=${encodeURIComponent(value)}`;
    })
    .join("&");

  return result;
};
