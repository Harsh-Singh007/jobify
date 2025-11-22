import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState([]);

  useEffect(() => {
    if (companies && companies.length > 0) {
      const filtered = companies.filter((company) => {
        if (!searchCompanyByText) return true;
        return company.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
      setFilterCompany(filtered);
    }
  }, [companies, searchCompanyByText]);

  if (!companies) {
    return (
      <div className="text-center py-6 text-slate-600 font-medium">
        Loading companies...
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableCaption className="text-slate-600">
          Recently registered companies
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Registered On</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-slate-500">
                No companies added yet
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
              <TableRow
                key={company._id}
                className="hover:bg-slate-50 transition-colors"
              >
                <TableCell>
                  <Avatar className="h-10 w-10 border shadow-sm">
                    <AvatarImage
                      src={company.logo || "https://via.placeholder.com/40"}
                      alt={`${company.name} logo`}
                    />
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium text-slate-800">
                  {company.name}
                </TableCell>
                <TableCell className="text-slate-600">
                  {new Date(company.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="text-slate-600 hover:text-slate-800" />
                    </PopoverTrigger>
                    <PopoverContent className="w-36">
                      <div
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
