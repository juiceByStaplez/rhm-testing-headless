"use client";

import { ComposableMap, Geographies } from "react-simple-maps";
import { useState } from "react";
import { geoPath, geoCentroid } from "d3-geo";
import { motion } from "framer-motion";

type Props = {
  stateCounts: Record<string, number>;
};
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const fipsToAbbr: Record<string, string> = {
  "01": "AL",
  "02": "AK",
  "04": "AZ",
  "05": "AR",
  "06": "CA",
  "08": "CO",
  "09": "CT",
  "10": "DE",
  "11": "DC",
  "12": "FL",
  "13": "GA",
  "15": "HI",
  "16": "ID",
  "17": "IL",
  "18": "IN",
  "19": "IA",
  "20": "KS",
  "21": "KY",
  "22": "LA",
  "23": "ME",
  "24": "MD",
  "25": "MA",
  "26": "MI",
  "27": "MN",
  "28": "MS",
  "29": "MO",
  "30": "MT",
  "31": "NE",
  "32": "NV",
  "33": "NH",
  "34": "NJ",
  "35": "NM",
  "36": "NY",
  "37": "NC",
  "38": "ND",
  "39": "OH",
  "40": "OK",
  "41": "OR",
  "42": "PA",
  "44": "RI",
  "45": "SC",
  "46": "SD",
  "47": "TN",
  "48": "TX",
  "49": "UT",
  "50": "VT",
  "51": "VA",
  "53": "WA",
  "54": "WV",
  "55": "WI",
  "56": "WY",
};

export default function USMap({ stateCounts }: Props) {
  const [hovered] = useState<string | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto aspect-[960/600]">
      <div className="relative">
        <ComposableMap projection="geoAlbersUsa">
          <Geographies geography={geoUrl}>
            {({ geographies, projection }) => {
              const pathGen = geoPath().projection(projection);

              return geographies.map((geo) => {
                const fips = geo.id;
                const stateAbbr = fipsToAbbr[fips];
                const count = stateCounts[stateAbbr] || 0;
                const centroid = geoCentroid(geo);
                const projectedCentroid = projection(centroid);
                const d = pathGen(geo); // ✅ now pathGen is defined

                if (!d || !projectedCentroid) return null;

                return (
                  <g key={geo.rsmKey}>
                    <motion.path
                      d={d}
                      fill={count > 0 ? "#60a5fa" : "#e5e7eb"}
                      stroke="#ffffff"
                      strokeWidth={0.5}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      style={{
                        transformOrigin: "center center",
                        cursor: "pointer",
                      }}
                    />
                    <text
                      x={projectedCentroid[0]}
                      y={projectedCentroid[1]}
                      textAnchor="middle"
                      className="pointer-events-none select-none text-[10px] fill-black font-medium"
                    >
                      {stateAbbr}
                    </text>
                  </g>
                );
              });
            }}
          </Geographies>
        </ComposableMap>

        {hovered && (
          <div className="absolute top-0 left-0 p-2 text-sm text-white bg-black bg-opacity-75 rounded shadow pointer-events-none">
            {hovered}: {stateCounts[hovered] || 0} projects
          </div>
        )}
      </div>
    </div>
  );
}
