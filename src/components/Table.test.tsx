import { render, fireEvent, waitFor } from "@testing-library/react";
import Table from "./Table";
import { getAPIData, sortAssetClassData, sortTableByCol } from "../utils";

jest.mock("../utils", () => ({
  getAPIData: jest.fn(() => Promise.resolve([])),
  sortAssetClassData: jest.fn((data) => data),
  sortTableByCol: jest.fn((data) => data),
}));

describe("Table Component", () => {
  const mockTableData = [
    {
      ticker: "ALPHA",
      price: 3150.67,
      assetClass: "Credit",
    },
    {
      ticker: "BETA",
      price: 3791.37,
      assetClass: "Equities",
    },
  ];

  beforeEach(() => {
    (getAPIData as jest.Mock).mockReset();
    (sortAssetClassData as jest.Mock).mockReset();
    (sortTableByCol as jest.Mock).mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders table headers", () => {
    const { getByText } = render(<Table />);
    expect(getByText("#")).toBeInTheDocument();
    expect(getByText("Asset Class")).toBeInTheDocument();
    expect(getByText("Price")).toBeInTheDocument();
    expect(getByText("Ticker")).toBeInTheDocument();
  });

  it("fetches and renders table data on mount", async () => {
    (getAPIData as jest.Mock).mockResolvedValue(mockTableData);
    const { getByText } = render(<Table />);
    await waitFor(() => getByText("Credit"));
    expect(getAPIData).toHaveBeenCalledTimes(1);
    expect(getByText("Credit")).toBeInTheDocument();
    expect(getByText("Equities")).toBeInTheDocument();
  });

  it("sorts table data by asset class when Asset Class header is clicked", () => {
    (sortAssetClassData as jest.Mock).mockReturnValue(
      [...mockTableData].reverse()
    );
    const { getByText } = render(<Table />);
    const assetClassHeader = getByText("Asset Class");
    fireEvent.click(assetClassHeader);
    expect(sortAssetClassData).toHaveBeenCalledTimes(1);
    expect(getByText("Equities")).toBeInTheDocument();
    expect(getByText("Credit")).toBeInTheDocument();
  });

  it("sorts table data by price when Price header is clicked", async () => {
    (sortTableByCol as jest.Mock).mockReturnValue([...mockTableData].reverse());
    const { getByText } = render(<Table />);
    const priceHeader = getByText("Price");
    fireEvent.click(priceHeader);
    expect(sortTableByCol).toHaveBeenCalledTimes(1);
    expect(getByText("Equities")).toBeInTheDocument();
    expect(getByText("Credit")).toBeInTheDocument();
  });

  it("sorts table data by ticker when ticker header is clicked", async () => {
    (sortTableByCol as jest.Mock).mockReturnValue([...mockTableData].reverse());
    const { getByText } = render(<Table />);
    const tickerHeader = getByText("Ticker");
    fireEvent.click(tickerHeader);
    expect(sortTableByCol).toHaveBeenCalledTimes(1);
    expect(getByText("Equities")).toBeInTheDocument();
    expect(getByText("Credit")).toBeInTheDocument();
  });
});

