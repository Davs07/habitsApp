import { Search } from "lucide-react";
import React from "react";

type Props = {};

const SearchComponent = (props: Props) => {

  const searchPlaceHolder = "Buscar Hábitos"

  return (
    <form className="form relative w-96 ">
      <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1">
        <Search size={16} />
      </button>
      <input
        className="input rounded-2xl px-8 py-2 border border-transparent w-full bg-main/10 focus:outline-none focus:border-main placeholder-gray-400 transition-all duration-300 "
        placeholder={searchPlaceHolder}
        type="text"
      />
      <button
        type="reset"
        className="absolute right-3 -translate-y-1/2 top-1/2 p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </form>
  );
};

export default SearchComponent;
