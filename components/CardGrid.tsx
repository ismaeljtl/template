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
        className="flex gap-2 mt-8 justify-center"
        breakLabel="..."
        nextLabel="Next →"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount!}
        previousLabel="← Previous"
        forcePage={Math.ceil((itemOffset + itemsPerPage) / itemsPerPage) - 1}
      />
    </>
  );
};

export default CardGrid;
