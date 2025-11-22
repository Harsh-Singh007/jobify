import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Mumbai", "Kolhapur", "Pune", "Bangalore", "Hyderabad", "Chennai"],
  },
  {
    filterType: "Technology",
    array: [
      "Mern",
      "React",
      "Data Scientist",
      "Fullstack",
      "Node",
      "Python",
      "Java",
      "Frontend",
      "Backend",
      "Mobile",
    ],
  },
];

const Filter = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(setSearchedQuery(search));
  }, [search]);

  return (
    <div className="w-full bg-slate-100 rounded-lg p-4 shadow-md">
      <h1 className="font-bold text-xl text-slate-800 mb-3">Filter Jobs</h1>

      {/* Search Input */}
      <Input
        placeholder="Search job and location."
        className="bg-white mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <hr className="border-slate-300 mb-4" />

      <RadioGroup value={search} onValueChange={setSearch}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-4">
            <h2 className="font-semibold text-slate-700 mb-2">{data.filterType}</h2>
            <div className="flex flex-wrap gap-3">
              {data.array.map((item, indx) => {
                const itemId = `Id${index}-${indx}`;
                return (
                  <label
                    key={itemId}
                    htmlFor={itemId}
                    className={`flex items-center gap-2 px-3 py-1 rounded-md cursor-pointer border transition-colors
                      ${
                        search === item
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-slate-800 border-gray-300 hover:border-blue-500"
                      }`}
                  >
                    <RadioGroupItem value={item} id={itemId} />
                    {item}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Filter;
