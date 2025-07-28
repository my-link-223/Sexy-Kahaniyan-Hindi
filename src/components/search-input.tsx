"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(defaultQuery);
  const [debouncedQuery] = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
        router.push(`/search?q=${encodeURIComponent(debouncedQuery)}`);
    } else if (defaultQuery && !debouncedQuery) {
        router.push(`/search`);
    }
  }, [debouncedQuery, router, defaultQuery]);

  return (
    <div className="relative hidden md:block">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search stories..."
        className="pl-8 sm:w-[200px] lg:w-[300px] bg-background/50"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}