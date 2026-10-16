
"use client";

import {
    PieChart,
    Pie,
    ResponsiveContainer,
} from "recharts";

const data = {
    maleCount: 1024,
    femaleCount: 334,
    total: 1358,
};

const malePercentage = (data.maleCount / data.total) * 100;
const femalePercentage = (data.femaleCount / data.total) * 100;

const maleData = [
    { name: "Male", value: malePercentage, fill: "#43D3D8" },
    { name: "Remaining", value: 100 - malePercentage, fill: "#43d3d83f" },
];

const femaleData = [
    { name: "Female", value: femalePercentage, fill: "#FF84AB" },
    { name: "Remaining", value: 100 - femalePercentage, fill: "#ff84ab6e" },
];

export default function GenderDonut() {
    return (
        <div style={{ width: "100%", minWidth: 0 ,paddingBottom:"30px"}}>
            <div style={{ width: "100%", height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={maleData}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            innerRadius={75}
                            outerRadius={90}
                            paddingAngle={2}
                            cornerRadius={5}
                            stroke="none"
                        />

                        <Pie
                            data={femaleData}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={65}
                            paddingAngle={2}
                            cornerRadius={5}
                            stroke="none"
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "24px",
                    flexWrap: "wrap",
                    fontSize: "14px",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                        style={{
                            width: 10,
                            height: 10,
                            flexShrink: 0,
                            borderRadius: "50%",
                            backgroundColor: "#3984F4",
                        }}
                    />
                    <span>
                        Male: {data.maleCount.toLocaleString()} (
                        {malePercentage.toFixed(1)}%)
                    </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                        style={{
                            width: 10,
                            height: 10,
                            flexShrink: 0,
                            borderRadius: "50%",
                            backgroundColor: "#E56AA6",
                        }}
                    />
                    <span>
                        Female: {data.femaleCount.toLocaleString()} (
                        {femalePercentage.toFixed(1)}%)
                    </span>
                </div>
            </div>
        </div>
    );
}