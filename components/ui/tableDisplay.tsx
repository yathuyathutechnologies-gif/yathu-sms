
'use client';
import { useLayoutEffect, useRef, useState } from "react";
import styles from './styles/tableDisplay.module.css';
import { truncate } from "../functions/truncate";
import { Minus, Plus } from "lucide-react";
import gsap from "gsap";

const data: any[] = [
    {
        id: '1',
        firstName: "Joshua",
        lastName: "Banda",
        sex: "male",
        program: "nursing",
        year: 'Year 1'
    },
    {
        id: '2',
        firstName: "John",
        lastName: "Chinangwa",
        sex: "male",
        program: "nursing",
        year: 'Year 1'
    }, {
        id: '3',
        firstName: "Maria",
        lastName: "Zonzi",
        sex: "female",
        program: "nursing",
        year: 'Year 1'
    }, {
        id: '4',
        firstName: "Tiwonge",
        lastName: "Banda",
        sex: "female",
        program: "nursing",
        year: 'Year 1'
    }, {
        id: '5',
        firstName: "Glory",
        lastName: "Banda",
        sex: "female",
        program: "nursing",
        year: 'Year 1'
    }, {
        id: '6',
        firstName: "Joel",
        lastName: "Mwale",
        sex: "female",
        program: "nursing",
        year: 'Year 1'
    }
];

// table  display recieves props table title and url
// the table title should macth the expected data from the server.
const TableDisplay = ({ tableTitle = [
    { title: "First name", key: "firstName" },
    { title: "Last Name", key: "lastName" },
    { title: "Program", key: "program" },
    { title: "Year", key: "year" },
    { title: "Sex", key: "sex" }
], url = '/' }: {
    tableTitle?: { title: string, key: string }[],
    url?: string
}) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [tableData, setTableData] = useState<any[]>(data);
    const [expandedIds, setExpandedIds] = useState<string[]>([]);
    const additionalInfoRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleAccordionExpand = (isExpanded: boolean, id: string) => {
        setExpandedIds((prev) => {
            const newIds = isExpanded
                ? prev.filter((expandedId) => expandedId !== id)
                : [...prev, id];

            return newIds;
        });
    };

    useLayoutEffect(() => {
        additionalInfoRefs.current.forEach((element, index) => {
            if (!element) return;

            const item = tableData[index];
            const isExpanded = expandedIds.includes(item.id);

            gsap.to(element, {
                height: isExpanded ? "auto" : 0,
                duration: 1,
                ease: "power1.out",
            });
        });
    }, [expandedIds, tableData]);

    const mobileCardItems = tableData.map((item, index) => {
        const isExpanded = expandedIds.includes(item.id);
        return (
            <li key={item.id} className={styles.mobileCardItem}>
                <div className={styles.cardHeader}>
                    {/* status */}
                    {/* status is displayed none when there is no status in the data, green for active, ref for inactive */}
                    <div className={styles.status} style={{}}>
                        <div />
                        <div />
                    </div>
                    {/* top focus */}
                    {/* The main message to stand out */}
                    <div className={styles.headerInformation}>
                        <div className={styles.mainMessage}>
                            <span>
                                {truncate(item[tableTitle[0].key], 8)}
                            </span>
                            <span>
                                {(tableTitle[1].key === "lastName") && truncate(item[tableTitle[1].key], 8)}
                            </span>
                        </div>
                        <div className={styles.secondMessage}>
                            {truncate(item[tableTitle[2].key], 10)}
                        </div>

                        <div className={styles.thirdMessage}>
                            {truncate(item[tableTitle[3].key], 10)}
                        </div>
                    </div>

                    {/* expand button */}
                    <div className={styles.shoreMore} onClick={() => { handleAccordionExpand(isExpanded, item.id) }}>
                        {isExpanded ? <Minus /> : <Plus />}
                    </div>
                </div>
                {
                    <div className={styles.additionalInfo} ref={(el) => {
                        additionalInfoRefs.current[index] = el;
                    }}>
                        {tableTitle
                            // .slice(3, isExpanded ? tableTitle.length : 3)
                            .map((t) => (
                                <div
                                    key={t.key}
                                    className={styles.titleAndValue}
                                >
                                    <div className={styles.title}>
                                        {t.title}
                                        <span>:</span>
                                    </div>

                                    <div className={styles.value}>
                                        {item[t.key]}
                                    </div>
                                </div>
                            ))}
                    </div>}
            </li>
        );
    });
    return (
        <div className={styles.container}>
            <svg
                width="0"
                height="0"
                style={{ position: "absolute" }}
            >
                <defs>

                    <clipPath
                        id="accordian"
                        clipPathUnits="objectBoundingBox"
                    >
                        <path
                            // transform="scale(0.01 0.0142857)"
                            d="
                                M 0 0
                                L 100 0

                                L 100 60

                                L 25 60

                                L 20 80
                                L 15 60
                                L 0 60
                                Z
                            "
                        />
                    </clipPath>
                </defs>
            </svg>
            <table className={styles.tableContainer}>
                <thead>
                    <tr>
                        {tableTitle.map((column) => (
                            <th key={column.key}>
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {tableData.map((item, index) => (
                        <tr key={index}>
                            {tableTitle.map((column) => (
                                <td key={column.key}>
                                    {item[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* card for mobile phones */}
            <ul className={styles.cardContainer}>
                {mobileCardItems}
            </ul>
        </div>

    );
}
export default TableDisplay;