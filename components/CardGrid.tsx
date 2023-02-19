import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import IData from "~/interfaces/Data";
import Card from "./Card";

const CardGrid: React.FC<{ data: IData[] | undefined }> = ({ data }) => {
  const itemsPerPage = 9;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const [currentItems, setCurrentItems] = useState(
    data && data.slice(itemOffset, endOffset)
  );
  const [pageCount, setPageCount] = useState(
    data && Math.ceil(data.length / itemsPerPage)
  );
  const [filteredData, setFilteredData] = useState(data);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const pageIndex = event.selected;
    const newOffset = data && (pageIndex * itemsPerPage) % data.length;
    setItemOffset(newOffset!);
  };

  useEffect(() => {
    filteredData && setCurrentItems(filteredData.slice(itemOffset, endOffset));
  }, [itemOffset, filteredData]);

  const filter = (value: string) => {
    if (data && data.length !== 0) {
      if (value === "") {
        setFilteredData(data);
        setPageCount(Math.ceil(data.length / itemsPerPage));
      } else {
        const filtered = data
          .filter((item: IData) => {
            return item.title.toLowerCase().includes(value.toLowerCase());
          })
          .sort();
        setFilteredData(filtered);
        setPageCount(Math.ceil(filtered.length / itemsPerPage));
        setItemOffset(0);
      }
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="prose mb-8">
          <h1>Items</h1>
        </div>
        <input
          type="text"
          placeholder="Filter results"
          className="input w-full max-w-xs"
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            filter(e.currentTarget.value)
          }
        />
      </div>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {currentItems &&
          currentItems.map((item) => <Card key={item.id} item={item} />)}
      </div>
      <ReactPaginate
        className="flex mt-8 justify-center"
        pageClassName="isolate inline-flex -space-x-px rounded-md shadow-sm"
        pageLinkClassName="relative inline-flex items-center border border-base-300 bg-base-100 px-2 md:px-4 py-2 text-sm font-medium text-gray-500 hover:bg-base-200 focus:z-20"
        activeLinkClassName="relative z-10 inline-flex items-center border border-indigo-500 bg-base-300 px-2 md:px-4 py-2 text-sm font-medium text-grey-600 focus:z-20"
        activeClassName="px-0"
        breakClassName="relative inline-flex items-center border border-base-300 bg-base-100 px-2 md:px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        previousLabel="«"
        breakLabel="..."
        nextLabel="»"
        onPageChange={handlePageClick}
        pageCount={Math.ceil(pageCount!)}
        previousClassName="relative inline-flex items-center rounded-l-md border border-base-300 bg-base-100 px-2 md:px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        nextClassName="relative inline-flex items-center rounded-r-md border border-base-300 bg-base-100 px-2 md:px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        forcePage={Math.ceil((itemOffset + itemsPerPage) / itemsPerPage) - 1}
      />
    </>
  );
};

export default CardGrid;
