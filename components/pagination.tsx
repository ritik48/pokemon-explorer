"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  totalResults?: number;
  resultsPerPage?: number;
}

export default function Pagination({
  currentPage,
  hasNext,
  hasPrevious,
  totalResults = 0,
  resultsPerPage = 20,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigate = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`/?${params.toString()}`);
  };

  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  return (
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="text-sm text-muted-foreground">
        {totalResults > 0 && (
          <span>
            Showing {startResult}-{endResult} of {totalResults} Pokemon
          </span>
        )}
      </div>

      <div className="flex justify-center items-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate(currentPage - 1)}
          disabled={!hasPrevious}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <span className="text-sm text-muted-foreground">
          Page {currentPage} {totalPages > 0 && `of ${totalPages}`}
        </span>

        <Button
          variant="outline"
          onClick={() => navigate(currentPage + 1)}
          disabled={!hasNext}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
