import React, { useEffect, useState } from "react";
import {
  getAPIData,
  sortAssetClassData,
  sortTableByCol,
  TableData,
} from "../utils";
import "./Table.scss";

const Table = () => {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [isAsc, setIsAsc] = useState<boolean>(true);

  useEffect(() => {
    const getTableData = async () => {
      const data = await getAPIData();
      setTableData(data);
    };
    getTableData();
  }, []);

  const sortHandler = (type: string) => {
    if (type === "assetClass") {
      const sortedData = sortAssetClassData(tableData);
      setTableData(sortedData);
      return;
    }
    const sortedData = sortTableByCol(tableData, type, isAsc);
    setTableData(sortedData);
    setIsAsc(!isAsc);
  };

  return (
    <>
      <table className="table" id="table-component">
        <thead>
          <tr>
            <th>#</th>
            <th onClick={() => sortHandler("assetClass")}>Asset Class</th>
            <th onClick={() => sortHandler("price")}>Price</th>
            <th onClick={() => sortHandler("ticker")}>Ticker</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => {
            return (
              <tr
                key={`assets_${index}`}
                className={`asset__row--${item.assetClass}`}
              >
                <td>{index + 1}</td>
                <td>{item.assetClass}</td>
                <td className={`${item.price < 0 ? "price__col--red" : ""}`}>
                  {item.price}
                </td>
                <td>{item.ticker}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
