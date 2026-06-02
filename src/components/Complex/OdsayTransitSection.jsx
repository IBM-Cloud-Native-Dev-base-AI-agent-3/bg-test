import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";

import { getPublicTransitRoute, getRouteGraphic } from "../../api/odsayApi";
import {
  formatOdsayGraphic,
  formatOdsayRoute,
} from "../../utils/formatOdsayRoute";
import styles from "./OdsayTransitSection.module.css";

const MIN_ODSAY_DISTANCE = 700;

function getStepIcon(type) {
  if (type === "walk") return "🚶";
  if (type === "bus") return "🚌";
  if (type === "subway") return "🚇";
  return "•";
}

function getStepLabel(type) {
  if (type === "walk") return "도보";
  if (type === "bus") return "버스";
  if (type === "subway") return "지하철";
  return "이동";
}

function getLaneName(step) {
  const firstLane = step.lane?.[0];

  if (!firstLane) return "";
  return firstLane.name || firstLane.busNo || firstLane.subwayCode || "";
}

function getDistanceMeter(startLat, startLng, endLat, endLng) {
  const earthRadius = 6371000;

  const toRadian = (degree) => (degree * Math.PI) / 180;

  const dLat = toRadian(endLat - startLat);
  const dLng = toRadian(endLng - startLng);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadian(startLat)) *
      Math.cos(toRadian(endLat)) *
      Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(earthRadius * c);
}

function createMarkerIcon(label, color) {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        min-width: 34px;
        height: 34px;
        padding: 0 10px;
        border-radius: 999px;
        background: ${color};
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 900;
        box-shadow: 0 10px 24px rgba(15, 23, 42, 0.22);
        border: 3px solid #fff;
        white-space: nowrap;
      ">
        ${label}
      </div>
    `,
    iconSize: [48, 40],
    iconAnchor: [24, 20],
  });
}

function FitMapBounds({ positions }) {
  const map = useMap();

  useEffect(() => {
    if (!positions || positions.length < 2) return;

    const bounds = L.latLngBounds(positions);
    map.fitBounds(bounds, {
      padding: [48, 48],
      maxZoom: 15,
    });
  }, [map, positions]);

  return null;
}

function createWalkRoute(station, distanceMeter) {
  const walkingTime = Math.max(1, Math.ceil(distanceMeter / 67));

  return {
    routeType: "walk",
    totalTime: walkingTime,
    payment: 0,
    totalWalk: distanceMeter,
    steps: [
      {
        id: 1,
        type: "walk",
        sectionTime: walkingTime,
        distance: distanceMeter,
        startName: "단지",
        endName: station?.name || "가까운 역",
        lane: [],
      },
    ],
  };
}

function OdsayTransitSection({ complex }) {
  const [routeInfo, setRouteInfo] = useState(null);
  const [routeLines, setRouteLines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [routeStatus, setRouteStatus] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("전체");

  const station = complex?.nearestStation;

  const startPosition = useMemo(() => {
    if (!complex?.latitude || !complex?.longitude) return null;
    return [complex.latitude, complex.longitude];
  }, [complex]);

  const endPosition = useMemo(() => {
    if (!station?.latitude || !station?.longitude) return null;
    return [station.latitude, station.longitude];
  }, [station]);

  const directDistance = useMemo(() => {
    if (!startPosition || !endPosition) return 0;

    return getDistanceMeter(
      startPosition[0],
      startPosition[1],
      endPosition[0],
      endPosition[1],
    );
  }, [startPosition, endPosition]);

  const fallbackLine = useMemo(() => {
    if (!startPosition || !endPosition) return [];
    return [startPosition, endPosition];
  }, [startPosition, endPosition]);

  const mapLines =
    routeLines.length > 0
      ? routeLines
      : [{ id: "direct", points: fallbackLine }];

  const allPositions = useMemo(() => {
    return mapLines.flatMap((line) => line.points || []);
  }, [mapLines]);

  const startIcon = useMemo(() => createMarkerIcon("출발", "#2563eb"), []);
  const endIcon = useMemo(() => createMarkerIcon("도착", "#ef4444"), []);

  useEffect(() => {
    if (!complex?.latitude || !complex?.longitude) return;
    if (!station?.latitude || !station?.longitude) return;

    const fetchOdsayRoute = async () => {
      try {
        setIsLoading(true);
        setRouteLines([]);

        if (directDistance > 0 && directDistance < MIN_ODSAY_DISTANCE) {
          setRouteInfo(createWalkRoute(station, directDistance));
          setRouteStatus("도보 접근");
          return;
        }

        const routeResponse = await getPublicTransitRoute({
          startLongitude: complex.longitude,
          startLatitude: complex.latitude,
          endLongitude: station.longitude,
          endLatitude: station.latitude,
        });

        const formattedRoute = formatOdsayRoute(routeResponse);

        if (!formattedRoute) {
          setRouteInfo(createWalkRoute(station, directDistance));
          setRouteStatus("도보 접근");
          return;
        }

        setRouteInfo({
          ...formattedRoute,
          routeType: "odsay",
        });

        setRouteStatus("ODsay API");

        if (formattedRoute.mapObject) {
          try {
            const graphicResponse = await getRouteGraphic(
              formattedRoute.mapObject,
            );

            const formattedLines = formatOdsayGraphic(graphicResponse);
            setRouteLines(formattedLines);
          } catch (graphicError) {
            console.error(graphicError);
            setRouteLines([]);
          }
        }
      } catch (error) {
        console.error(error);

        setRouteInfo(createWalkRoute(station, directDistance));
        setRouteStatus("도보 접근");
        setRouteLines([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOdsayRoute();
  }, [
    complex?.latitude,
    complex?.longitude,
    station?.latitude,
    station?.longitude,
    directDistance,
  ]);

  if (!complex || !startPosition) return null;

  if (!station || !endPosition) {
    return (
      <section className={styles.section}>
        <h2>대중교통 길찾기</h2>
        <div className={styles.emptyBox}>가까운 지하철역 정보가 없습니다.</div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h2>
        {complex.name} ↔ {station.name} 대중교통 길찾기
      </h2>

      <div className={styles.routeCard}>
        <aside className={styles.routePanel}>
          <div className={styles.filterTabs}>
            {["전체", "지하철 우선", "버스 우선"].map((filter) => (
              <button
                key={filter}
                type="button"
                className={selectedFilter === filter ? styles.active : ""}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {isLoading && (
            <div className={styles.loadingBox}>
              경로 정보를 불러오는 중입니다...
            </div>
          )}

          {!isLoading && routeInfo && (
            <>
              <div className={styles.summary}>
                <span>{routeStatus} 경로 정보</span>
                <strong>{routeInfo.totalTime}분 소요</strong>

                <div className={styles.summaryMeta}>
                  <p>
                    요금: {Number(routeInfo.payment || 0).toLocaleString()}원
                  </p>
                  <p>도보: {routeInfo.totalWalk || 0}m</p>
                </div>

                {routeInfo.routeType === "walk" && (
                  <p className={styles.warningText}>
                    출발지와 목적지가 700m 이내라 대중교통 경로 대신 도보 접근
                    정보로 표시합니다.
                  </p>
                )}
              </div>

              <div className={styles.stepList}>
                {(routeInfo.steps || []).map((step) => {
                  const laneName = getLaneName(step);

                  return (
                    <div key={step.id} className={styles.stepItem}>
                      <div className={styles.stepDot} />

                      <div className={styles.stepContent}>
                        <div className={styles.stepTitleRow}>
                          {laneName && (
                            <span className={styles.lineBadge}>{laneName}</span>
                          )}

                          <strong>
                            {getStepIcon(step.type)} {getStepLabel(step.type)}
                          </strong>
                        </div>

                        <p>
                          {step.startName && step.endName
                            ? `${step.startName} → ${step.endName}`
                            : "이동 구간"}
                        </p>

                        <span>
                          {step.sectionTime}분
                          {step.distance ? ` · ${step.distance}m` : ""}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </aside>

        <div className={styles.mapArea}>
          <MapContainer
            center={startPosition}
            zoom={14}
            scrollWheelZoom={false}
            className={styles.map}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors &copy; CARTO"
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />

            <FitMapBounds
              positions={allPositions.length > 0 ? allPositions : fallbackLine}
            />

            <Marker position={startPosition} icon={startIcon}>
              <Popup>{complex.name}</Popup>
            </Marker>

            <Marker position={endPosition} icon={endIcon}>
              <Popup>{station.name}</Popup>
            </Marker>

            {mapLines.map((line) => (
              <Polyline
                key={line.id}
                positions={line.points}
                pathOptions={{
                  color: "#2563eb",
                  weight: 7,
                  opacity: 0.85,
                }}
              />
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
}

export default OdsayTransitSection;
