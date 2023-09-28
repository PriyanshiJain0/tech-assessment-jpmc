import data from "./data.json";

export interface TableData {
  ticker: string;
  price: number;
  assetClass: string;
}

export const getAPIData = () => {
  return new Promise<TableData[]>((resolve, reject) => {
    resolve(data);
  });
};

export const sortAssetClassData = (data: TableData[]): TableData[] => {
  const equitiesData = data.filter((item) => {
    return item.assetClass === "Equities";
  });
  const macroData = data.filter((item) => {
    return item.assetClass === "Macro";
  });
  const creditData = data.filter((item) => {
    return item.assetClass === "Credit";
  });
  return [...equitiesData, ...macroData, ...creditData];
};

export const sortTableByCol = (
  data: TableData[],
  field: string,
  isAsc: boolean = true
) => {
  const sortedData = data.sort((a, b) => {
    const sortOrder = sortComparator(a, b, field);
    return isAsc ? sortOrder : -sortOrder;
  });
  return sortedData;
};

const sortComparator = (a: any, b: any, field: any) => {
  const aval =
    typeof a[field] === "string" ? a[field].toLocaleLowerCase() : a[field];
  const bval =
    typeof b[field] === "string" ? b[field].toLocaleLowerCase() : b[field];
  if (aval > bval) {
    return 1;
  } else if (aval < bval) {
    return -1;
  }
  return 0;
};
