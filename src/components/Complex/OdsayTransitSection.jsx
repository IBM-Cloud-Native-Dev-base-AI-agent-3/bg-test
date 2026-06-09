import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { getNearbyStations } from "../../api/odsayApi";
import styles from "./OdsayTransitSection.module.css";

const startIcon = L.divIcon({
  className: styles.startMarker,
  html: "출발",
  iconSize: [52, 34],
  iconAnchor: [26, 17],
});

const endIcon = L.divIcon({
  className: styles.endMarker,
  html: "도착",
  iconSize: [52, 34],
  iconAnchor: [26, 17],
});

function getDistanceMeter(lat1, lng1, lat2, lng2) {
  const radius = 6371e3;
  const rad1 = (lat1 * Math.PI) / 180;
  const rad2 = (lat2 * Math.PI) / 180;
  const deltaLat = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(rad1) *
      Math.cos(rad2) *
      Math.sin(deltaLng / 2) *
      Math.sin(deltaLng / 2);

  return Math.round(radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function formatDistance(meter) {
  if (!meter && meter !== 0) return "-";
  if (meter >= 1000) return `${(meter / 1000).toFixed(1)}km`;
  return `${meter}m`;
}

function getWalkMinute(meter) {
  if (!meter && meter !== 0) return 0;
  return Math.max(1, Math.ceil(meter / 67));
}

function normalizeStations(data, destination) {
  const result = data?.result || {};

  const rawStations =
    result.station ||
    result.stations ||
    result.poi ||
    result.POI ||
    result.busStation ||
    result.busStations ||
    [];

  const stationList = Array.isArray(rawStations) ? rawStations : [rawStations];

  return stationList
    .map((station, index) => {
      const latitude = Number(
        station.y ??
          station.lat ??
          station.latitude ??
          station.stationY ??
          station.arsY,
      );

      const longitude = Number(
        station.x ??
          station.lng ??
          station.lon ??
          station.longitude ??
          station.stationX ??
          station.arsX,
      );

      if (Number.isNaN(latitude) || Number.isNaN(longitude)) return null;

      const distance =
        Number(station.distance) ||
        Number(station.dist) ||
        getDistanceMeter(
          destination.latitude,
          destination.longitude,
          latitude,
          longitude,
        );

      const name =
        station.stationName ||
        station.name ||
        station.poiNm ||
        station.arsName ||
        "가까운 역";

      const line =
        station.laneName ||
        station.subwayLaneName ||
        station.type ||
        station.stationClass ||
        "지하철";

      return {
        id:
          station.stationID ||
          station.id ||
          station.arsID ||
          `station-${index}`,
        name,
        line,
        latitude,
        longitude,
        distance,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.distance - b.distance);
}

// function createKakaoMapUrl(destination) {
//   if (!destination?.latitude || !destination?.longitude) {
//     return `https://map.kakao.com/link/search/${encodeURIComponent(
//       destination?.address || destination?.name || "",
//     )}`;
//   }

//   return `https://map.kakao.com/link/to/${encodeURIComponent(
//     destination.name || "목적지",
//   )},${destination.latitude},${destination.longitude}`;
// }

function MapFitBounds({ positions }) {
  const map = useMap();

  useEffect(() => {
    if (!positions || positions.length === 0) return;

    const bounds = L.latLngBounds(positions);

    map.fitBounds(bounds, {
      padding: [70, 70],
      maxZoom: 16,
    });
  }, [map, positions]);

  return null;
}

function RouteMap({ destination, station }) {
  const stationPosition = station
    ? [station.latitude, station.longitude]
    : [destination.latitude, destination.longitude];

  const housePosition = [destination.latitude, destination.longitude];

  const positions = station
    ? [stationPosition, housePosition]
    : [housePosition];

  return (
    <MapContainer
      className={styles.map}
      center={housePosition}
      zoom={15}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors &copy; CARTO"
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      <MapFitBounds positions={positions} />

      {station && (
        <>
          <Polyline
            positions={[stationPosition, housePosition]}
            weight={6}
            opacity={0.9}
            className={styles.routeLine}
          />

          <Marker position={stationPosition} icon={startIcon}>
            <Popup>{station.name}</Popup>
            <Tooltip direction="top" offset={[0, -16]} opacity={1}>
              {station.name}
            </Tooltip>
          </Marker>
        </>
      )}

      <Marker position={housePosition} icon={endIcon}>
        <Popup>{destination.name}</Popup>
        <Tooltip direction="top" offset={[0, -16]} opacity={1}>
          {destination.name}
        </Tooltip>
      </Marker>
    </MapContainer>
  );
}

function OdsayTransitSection({ destination }) {
  const [nearestStation, setNearestStation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isValidDestination = Boolean(
    destination?.latitude && destination?.longitude,
  );

  useEffect(() => {
    const fetchNearestStation = async () => {
      if (!isValidDestination) {
        setNearestStation(null);
        setErrorMessage(
          "주소 좌표 정보가 없어 접근 정보를 표시할 수 없습니다.",
        );
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage("");
        setNearestStation(null);

        const searchRadii = [2000, 5000, 10000];

        let nearestStations = [];

        for (const radius of searchRadii) {
          try {
            const data = await getNearbyStations({
              latitude: destination.latitude,
              longitude: destination.longitude,
              radius,
            });

            nearestStations = normalizeStations(data, destination);

            if (nearestStations.length > 0) {
              break;
            }
          } catch (error) {
            console.warn(`${radius}m 반경 주변 역 검색 실패`, error);
          }
        }

        if (nearestStations.length === 0) {
          setErrorMessage("반경 내 가까운 역 또는 정류장을 찾지 못했습니다.");
          return;
        }

        setNearestStation(nearestStations[0]);
      } catch (error) {
        console.error(error);
        setErrorMessage(
          "ODsay 경로 정보를 불러오지 못했습니다. 지도에는 주택 위치만 표시합니다.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchNearestStation();
  }, [
    destination?.id,
    destination?.latitude,
    destination?.longitude,
    isValidDestination,
  ]);

  const distance = nearestStation?.distance || 0;
  const walkMinute = getWalkMinute(distance);

  const title = nearestStation
    ? `${destination?.name || "선택 위치"} ↔ ${nearestStation.name} 대중교통 길찾기`
    : `${destination?.name || "선택 위치"} 접근 정보`;

  const isWalkOnly = nearestStation && distance <= 700;

  const routeDescription = isWalkOnly
    ? "출발지와 목적지가 700m 이내라 대중교통 경로 대신 도보 접근 경로로 표시합니다."
    : "선택한 공급정보 위치 기준 가장 가까운 역과의 접근 정보를 표시합니다.";

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.routeBox}>
        <aside className={styles.panel}>
          <div className={styles.infoHeader}>
            {/* <span>NEAREST TRANSIT</span> */}
            <strong>가장 가까운 대중교통 접근 정보</strong>
          </div>

          <div className={styles.divider} />

          {isLoading && (
            <div className={styles.stateBox}>
              ODsay 접근 정보를 불러오는 중입니다...
            </div>
          )}

          {!isLoading && errorMessage && (
            <div className={styles.warningBox}>{errorMessage}</div>
          )}

          {!isLoading && nearestStation && (
            <>
              <div className={styles.summary}>
                <span>도보 접근 경로 정보</span>
                <strong>{walkMinute}분 소요</strong>

                <div className={styles.meta}>
                  <p>요금: 0원</p>
                  <p>도보: {formatDistance(distance)}</p>
                </div>

                <em>{routeDescription}</em>
              </div>

              <div className={styles.divider} />

              <div className={styles.stepList}>
                <article>
                  <span className={styles.circle} />

                  <div className={styles.stepContent}>
                    <div className={styles.stepTop}>
                      {/* <b>도보</b> */}
                      <strong>도보</strong>
                    </div>

                    <p>
                      {nearestStation.name} → {destination.name}
                    </p>

                    <em>
                      {walkMinute}분 · {formatDistance(distance)}
                    </em>
                  </div>
                </article>
              </div>
            </>
          )}
        </aside>

        <div className={styles.mapWrap}>
          {isValidDestination ? (
            <RouteMap destination={destination} station={nearestStation} />
          ) : (
            <div className={styles.emptyMap}>
              지도에 표시할 좌표 정보가 없습니다.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default OdsayTransitSection;
