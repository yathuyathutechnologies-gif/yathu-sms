
"use client";

import {
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import styles from "./styles/dashBoardTable.module.css";


import {
    FilterIcon,
    Search,
    SortAsc,
    Square,
    SquareCheckBig,
} from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useApiFetch } from "@/lib/api";
import { useStaffPortal } from "@/app/staffPortal/StaffPortalContext";
import { truncate } from "@/components/functions/truncate";

type TableColumn = {
    title: string;
    key: string;
};

type FilterOption = {
    value: string;
    text: string;
};
type SortOption = {
    value: string;
    text: string;
};
type TableItem = {
    id: string | number;
    [key: string]: any;
};

type PaginationResponse = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
};

type ApiResponse = {
    success: boolean;
    message?: string;
    data: TableItem[];
    pagination: PaginationResponse;
};

type TableDisplayProps = {
    tableTitle?: TableColumn[];
    dataUrl?: string;
    filterOptions?: FilterOption[];
    sortOptions?: SortOption[]
};

const data = [
    {
        id: 1,
        firstName: "Thoko",
        lastName: "Banda",
        program: "Bachelor of Medicine and Surgery",
        year: 3,
        sex: "Female",
    },
    {
        id: 2,
        firstName: "Chisomo",
        lastName: "Phiri",
        program: "Bachelor of Nursing",
        year: 2,
        sex: "Male",
    },
    {
        id: 3,
        firstName: "Tadala",
        lastName: "Mbewe",
        program: "Clinical Medicine",
        year: 1,
        sex: "Female",
    },
    {
        id: 4,
        firstName: "Blessings",
        lastName: "Chirwa",
        program: "Pharmacy",
        year: 4,
        sex: "Male",
    },
    {
        id: 5,
        firstName: "Memory",
        lastName: "Zondi",
        program: "Medical Laboratory Science",
        year: 2,
        sex: "Female",
    },
    {
        id: 6,
        firstName: "Yamikani",
        lastName: "Kamanga",
        program: "Bachelor of Nursing",
        year: 3,
        sex: "Male",
    },
    {
        id: 7,
        firstName: "Pempho",
        lastName: "Nkhoma",
        program: "Public Health",
        year: 1,
        sex: "Female",
    },
    {
        id: 8,
        firstName: "Chikondi",
        lastName: "Msowoya",
        program: "Physiotherapy",
        year: 4,
        sex: "Male",
    },
    {
        id: 9,
        firstName: "Mphatso",
        lastName: "Jere",
        program: "Medical Laboratory Science",
        year: 2,
        sex: "Female",
    },
    {
        id: 10,
        firstName: "Dalitso",
        lastName: "Gondwe",
        program: "Clinical Medicine",
        year: 3,
        sex: "Male",
    },
];
const PAGE_LIMIT = 5;
const SEARCH_DEBOUNCE_MS = 400;

const DashboardTableDisplay = ({
    tableTitle = [
        {
            title: "First name",
            key: "firstName",
        },
    ],
    dataUrl = "/",
    filterOptions = [],
    sortOptions = []
}: TableDisplayProps) => {
    // API AND AUTHENTICATION

    const apiFetch = useApiFetch();

    const {
        isAuthLoading,
        isAuthenticated,
        actionToogleOpen,
        toggleActions,
    } = useStaffPortal();

    // Keep the latest API function without making a new
    // function reference trigger another fetch.
    const apiFetchRef = useRef(apiFetch);
    apiFetchRef.current = apiFetch;

    // TABLE DATA

    const [tableData, setTableData] = useState<TableItem[]>(data);

    const [selectedIds, setSelectedIds] = useState<Array<string | number>>([]);
    const [expandedIds, setExpandedIds] = useState<Array<string | number>>([]);
    const additionalInfoRefs = useRef<Array<HTMLDivElement | null>>([]);

    // PAGINATION
    const [pageState, setPageState] = useState({
        page: 1,
        queryKey: "",
    });

    const page = pageState.page;

    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [initialLoaded, setInitialLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    // These refs prevent multiple observer callbacks from
    // scheduling duplicate pages.
    const loadingRef = useRef(false);
    const pageScheduledRef = useRef(false);

    // SEARCH

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search.trim());
        }, SEARCH_DEBOUNCE_MS);

        return () => {
            clearTimeout(timer);
        };
    }, [search]);

    // FILTERS

    const [filterBy, setFilterBy] = useState("none");
    const [filterValue, setFilterValue] = useState("");
    // SORT
    const [sortBy, setSortBy] = useState("firstName");
    const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");
    const [showSortDialog, setShowSortDialog] = useState(false);
    const sortRef = useRef(null);

    const [submittedFilter, setSubmittedFilter] = useState({
        filterBy: "",
        filterValue: "",
    });

    const [showFilterDialog, setShowFilterDialog] = useState(false);

    const filterRef = useRef<HTMLDivElement | null>(null);

    const actionContainerRef = useRef<HTMLUListElement | null>(null);


    const queryKey = useMemo(() => {
        const params = new URLSearchParams();

        if (debouncedSearch !== "") {
            params.set("search", debouncedSearch);
        }

        if (
            submittedFilter.filterBy !== "" &&
            submittedFilter.filterValue.trim() !== ""
        ) {
            params.set("filterBy", submittedFilter.filterBy);

            params.set(
                "filterValue",
                submittedFilter.filterValue.trim()
            );
        }
        params.set("sortBy", sortBy);
        params.set("sortOrder", sortOrder);

        return params.toString();
    }, [debouncedSearch, submittedFilter, sortBy, sortOrder]);

    const handleOnFilterChange = (value: string) => {
        setFilterBy(value);

        setFilterValue("");
    };

    const handleOnSortChange = (value: string) => {
        setSortBy(value);

        // setSortBy("ASC");
    };


    const submitFilter = () => {
        setSubmittedFilter({
            filterBy: filterBy === "none" ? "" : filterBy,
            filterValue: filterValue.trim(),
        });

        setShowFilterDialog(false);
        toggleActions();
    };

    const clearFilter = () => {
        setFilterBy("none");
        setFilterValue("");

        setSubmittedFilter({
            filterBy: "",
            filterValue: "",
        });
    };
    const clearSort = () => {
        setSortBy("firstName");
        setSortOrder("ASC");
    };
    // FETCH DATA

    useEffect(() => {
        if (isAuthLoading || !isAuthenticated) {
            setLoading(false);
            loadingRef.current = false;
            pageScheduledRef.current = false;
            return;
        }

        // Search/filter changed. Reset the pagination state
        // before making a request for the new dataset.
        if (pageState.queryKey !== queryKey) {
            loadingRef.current = false;
            pageScheduledRef.current = false;

            setLoading(false);
            // setTableData([]);
            setHasMore(true);
            setInitialLoaded(false);
            setError(null);

            // Clear selections and expanded rows belonging to the previous result set.
            setSelectedIds([]);
            setExpandedIds([]);

            setPageState({
                page: 1,
                queryKey,
            });

            return;
        }

        let cancelled = false;

        const fetchData = async () => {
            // The observer or another render must not start a second request while one is already active.
            if (loadingRef.current) {
                return;
            }

            loadingRef.current = true;
            pageScheduledRef.current = false;

            setLoading(true);
            setError(null);

            try {
                const params = new URLSearchParams(queryKey);

                params.set("page", String(page));
                params.set("limit", String(PAGE_LIMIT));

                const separator = dataUrl.includes("?") ? "&" : "?";

                const url =
                    `${dataUrl}${separator}${params.toString()}`;

                const response = await apiFetchRef.current(url);

                if (!response.ok) {
                    throw new Error(
                        `Request failed with status ${response.status}`
                    );
                }

                const result: ApiResponse = await response.json();

                if (cancelled) {
                    return;
                }

                if (
                    !result.success ||
                    !Array.isArray(result.data) ||
                    !result.pagination
                ) {
                    throw new Error(
                        "The server returned an invalid response."
                    );
                }

                const fetchedItems = result.data;

                setTableData((previousData) => {
                    // Page 1 replaces old results.
                    // Other pages append to the existing results.
                    const currentData =
                        page === 1 ? [] : previousData;

                    const existingIds = new Set(
                        currentData.map((item) => String(item.id))
                    );

                    const uniqueItems = fetchedItems.filter((item) => {
                        const id = String(item.id);

                        if (existingIds.has(id)) {
                            return false;
                        }

                        existingIds.add(id);
                        return true;
                    });

                    return [...currentData, ...uniqueItems];
                });

                setHasMore(
                    result.pagination.hasNextPage === true
                );

                if (page === 1) {
                    setInitialLoaded(true);
                }
            } catch (err) {
                if (!cancelled) {
                    console.error("Failed to fetch table data:", err);

                    setError(
                        err instanceof Error
                            ? err.message
                            : "An unexpected error occurred."
                    );
                }
            } finally {
                if (!cancelled) {
                    loadingRef.current = false;
                    setLoading(false);
                }
            }
        };

        // void fetchData();

        return () => {
            // Ignore the result of an obsolete request.
            cancelled = true;

            // Release the lock so the new effect can fetch.
            loadingRef.current = false;
        };
    }, [
        isAuthLoading,
        isAuthenticated,
        page,
        pageState.queryKey,
        queryKey,
        dataUrl,
    ]);







    useLayoutEffect(() => {
        const element = filterRef.current;

        if (!element) {
            return;
        }

        const timeline = gsap.timeline();

        if (showFilterDialog && actionToogleOpen) {
            timeline
                .set(element, {
                    display: "flex",
                })
                .to(element, {
                    delay: 1,
                    y: -100,
                    scale: 1,
                    duration: 1,
                    ease: "power1.out",
                });
        } else {
            timeline
                .to(element, {
                    y: -500,
                    scale: 0,
                    duration: 1,
                    ease: "power1.in",
                })
                .set(element, {
                    display: "none",
                });
            setShowFilterDialog(false)
        }
        return () => {
            timeline.kill();
        };
    }, [showFilterDialog, actionToogleOpen]);


    useLayoutEffect(() => {
        const element = sortRef.current;

        if (!element) {
            return;
        }

        const timeline = gsap.timeline();


        if (showSortDialog && actionToogleOpen) {
            timeline
                .set(element, {
                    display: "flex",
                })
                .to(element, {
                    delay: 1,
                    y: -100,
                    scale: 1,
                    duration: 1,
                    ease: "power1.out",
                });
        } else {
            timeline
                .to(element, {
                    y: -500,
                    scale: 0,
                    duration: 1,
                    ease: "power1.in",
                })
                .set(element, {
                    display: "none",
                });
            setShowSortDialog(false);
        }


        return () => {
            timeline.kill();
        };
    }, [showSortDialog, actionToogleOpen]);



    return (
        <div
            className={styles.container}
            ref={containerRef}
        >
            {/* Search, sort and filter actions */}
            <ul
                className={styles.actionContainer}
                ref={actionContainerRef}
            >
                <li className={styles.searchContainer}>
                    <input
                        className={styles.searchText}
                        type="search"
                        placeholder="Search"
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                    />

                    <div className={styles.searchIcon}>
                        <Search size={20} />
                    </div>
                </li>

                <li
                    onClick={() => {
                        setShowSortDialog(true);
                        toggleActions();
                    }}
                >
                    <SortAsc size={20} />
                </li>

                <li
                    onClick={() => {
                        toggleActions();
                        setShowFilterDialog(true);
                    }}
                >
                    <FilterIcon size={20} />

                </li>
            </ul>
            <div className={styles.tableWrapper}>
                <table className={styles.tableContainer}>
                    <thead>
                        <tr>
                            <th className={styles.selectedHeader} />

                            {tableTitle.map((column) => (
                                <th key={column.key}>
                                    {column.title}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {tableData.slice(0, 5).map((item) => {
                            const isSelected = selectedIds.includes(item.id);

                            return (
                                <tr key={item.id}>
                                    <td>
                                        <button
                                            type="button"
                                            aria-label={
                                                isSelected
                                                    ? "Deselect row"
                                                    : "Select row"
                                            }
                                            aria-pressed={isSelected}
                                            onClick={() => {
                                                setSelectedIds((previous) =>
                                                    isSelected
                                                        ? previous.filter(
                                                            (id) => id !== item.id
                                                        )
                                                        : [...previous, item.id]
                                                );
                                            }}
                                        >
                                            {isSelected ? (
                                                <SquareCheckBig />
                                            ) : (
                                                <Square />
                                            )}
                                        </button>
                                    </td>

                                    {tableTitle.map((column) => (
                                        <td key={column.key}>
                                            {item[column.key] ?? ""}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {!loading && error && (
                <div role="alert">
                    <p>{error}</p>

                    <button
                        type="button"
                        onClick={() => {
                            // Retry the current page using the
                            // existing query and pagination state.
                            setError(null);

                            setPageState((previous) => ({
                                ...previous,
                                page: previous.page,
                            }));

                            // Trigger a retry without advancing the page.
                            setPageState((previous) => ({
                                ...previous,
                                queryKey: "",
                            }));
                        }}
                    >
                        Retry
                    </button>
                </div>
            )}

            {initialLoaded &&
                !loading &&
                !error &&
                tableData.length === 0 && (
                    <p>No records found.</p>
                )}

            {/* Keep the sentinel in the document while more data exists. */}
            <div
                ref={loadMoreRef}
                aria-hidden="true"
                style={{
                    width: "100%",
                    height: "1px",
                    pointerEvents: "none",
                }}
            />


            {/* Filter dialog */}
            <div
                className={styles.filterCard}
                ref={filterRef}
            >
                <label htmlFor="filterBy">
                    Filter By
                </label>

                <select
                    id="filterBy"
                    value={filterBy}
                    onChange={(event) =>
                        handleOnFilterChange(event.target.value)
                    }
                >
                    <option value="none">
                        Select filter
                    </option>

                    {filterOptions.map((option) => (
                        <option
                            value={option.value}
                            key={option.value}
                        >
                            {option.text}
                        </option>
                    ))}
                </select>

                {filterBy !== "none" && (
                    <input
                        type="text"
                        placeholder={`Enter ${filterBy}`}
                        value={filterValue}
                        onChange={(event) =>
                            setFilterValue(event.target.value)
                        }
                    />
                )}

                <div className={styles.filterButtons}>
                    <button
                        type="button"
                        className={styles.clearButton}
                        onClick={clearFilter}
                    >
                        Clear
                    </button>

                    <button
                        type="button"
                        className={styles.submitButton}
                        disabled={
                            filterBy === "none" ||
                            !filterValue.trim()
                        }
                        onClick={submitFilter}
                    >
                        Apply
                    </button>
                </div>
            </div>

            {/* Sort dialog */}
            <div
                className={styles.sortCard}
                ref={sortRef}
            >
                <label htmlFor="sortBy">
                    Sort By
                </label>

                <select
                    id="sortBy"
                    value={sortBy}
                    onChange={(event) =>
                        handleOnSortChange(event.target.value)
                    }
                >

                    {sortOptions.map((option) => (
                        <option
                            value={option.value}
                            key={option.value}
                        >
                            {option.text}
                        </option>
                    ))}
                </select>

                <select
                    value={sortOrder}
                    onChange={(event) =>
                        setSortOrder(event.target.value as "ASC" | "DESC")
                    }
                >
                    <option value="ASC">Ascending</option>
                    <option value="DESC">Descending</option>
                </select>

                <div className={styles.sortButtons}>
                    <button
                        type="button"
                        className={styles.clearButton}
                        onClick={clearSort}
                    >
                        Clear
                    </button>

                    <button
                        type="button"
                        className={styles.submitButton}
                        disabled={
                            !sortOrder.trim()
                        }
                        onClick={toggleActions}
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardTableDisplay;
