"use client";
import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

function Number({
  mv,
  number,
  height,
}: {
  mv: MotionValue<number>;
  number: number;
  height: number;
}) {
  let y = useTransform(mv, (latest) => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });

  const style: React.CSSProperties = {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return <motion.span style={{ ...style, y }}>{number}</motion.span>;
}

function Digit({
  place,
  value,
  height,
  digitStyle,
}: {
  place: number;
  value: number;
  height: number;
  digitStyle?: React.CSSProperties;
}) {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace, {
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  const defaultStyle: React.CSSProperties = {
    height,
    position: "relative",
    width: "1ch",
    fontVariantNumeric: "tabular-nums",
    overflow: "hidden",
  };

  return (
    <div style={{ ...defaultStyle, ...digitStyle }}>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </div>
  );
}

function CounterUnit({
  value,
  label,
  places,
  fontSize,
  padding,
  gap,
  borderRadius,
  horizontalPadding,
  textColor,
  fontWeight,
  digitStyle,
  labelStyle,
}: {
  value: number;
  label: string;
  places: number[];
  fontSize: number;
  padding: number;
  gap: number;
  borderRadius: number;
  horizontalPadding: number;
  textColor: string;
  fontWeight: React.CSSProperties["fontWeight"];
  digitStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
}) {
  const height = fontSize + padding;

  const defaultCounterStyle: React.CSSProperties = {
    fontSize,
    display: "flex",
    gap: gap,
    overflow: "hidden",
    borderRadius: borderRadius,
    paddingLeft: horizontalPadding,
    paddingRight: horizontalPadding,
    lineHeight: 1,
    color: textColor,
    fontWeight: fontWeight,
    backgroundColor: "#f3f3f3",
  };

  const defaultLabelStyle: React.CSSProperties = {
    fontSize: fontSize * 0.3,
    color: textColor,
    textAlign: "center",
    marginTop: 4,
    fontWeight: "normal",
  };

  return (
    <div className="flex flex-col items-center">
      <div style={{ position: "relative", display: "inline-block" }}>
        <div style={defaultCounterStyle}>
          {places.map((place) => (
            <Digit
              key={place}
              place={place}
              value={value}
              height={height}
              digitStyle={digitStyle}
            />
          ))}
        </div>
      </div>
      <div style={{ ...defaultLabelStyle, ...labelStyle }}>{label}</div>
    </div>
  );
}

function calculateCurrentAge(birthDate: string) {
  const now = new Date();
  const birth = new Date(birthDate);

  // Calculate years
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();
  let hours = now.getHours() - birth.getHours();
  let minutes = now.getMinutes() - birth.getMinutes();
  let seconds = now.getSeconds() - birth.getSeconds();

  // Adjust for negative values by borrowing from the next unit
  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }

  if (minutes < 0) {
    minutes += 60;
    hours--;
  }

  if (hours < 0) {
    hours += 24;
    days--;
  }

  if (days < 0) {
    // Get the last day of the previous month
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += lastMonth.getDate();
    months--;
  }

  if (months < 0) {
    months += 12;
    years--;
  }

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    hours: Math.max(0, hours),
    minutes: Math.max(0, minutes),
    seconds: Math.max(0, seconds),
  };
}

function getPlacesForValue(value: number): number[] {
  if (value < 10) return [1];
  if (value < 100) return [10, 1];
  if (value < 1000) return [100, 10, 1];
  if (value < 10000) return [1000, 100, 10, 1];
  if (value < 100000) return [10000, 1000, 100, 10, 1];
  if (value < 1000000) return [100000, 10000, 1000, 100, 10, 1];
  return [1000000, 100000, 10000, 1000, 100, 10, 1];
}

export default function BirthdayCounter({
  birthDate,
  fontSize = 60,
  padding = 0,
  gap = 0,
  unitGap = 10,
  borderRadius = 8,
  horizontalPadding = 10,
  textColor = "#000000",
  fontWeight = "bold",
  containerStyle,
  digitStyle,
  labelStyle,
  updateInterval = 100,
  showAge = true,
  showMonths = true,
  showDays = true,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
}: {
  birthDate: string;
  fontSize?: number;
  padding?: number;
  gap?: number;
  unitGap?: number;
  borderRadius?: number;
  horizontalPadding?: number;
  textColor?: string;
  fontWeight?: React.CSSProperties["fontWeight"];
  containerStyle?: React.CSSProperties;
  digitStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  updateInterval?: number;
  showAge?: boolean;
  showMonths?: boolean;
  showDays?: boolean;
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
}) {
  const [ageData, setAgeData] = useState(() => calculateCurrentAge(birthDate));

  useEffect(() => {
    const interval = setInterval(() => {
      const newAgeData = calculateCurrentAge(birthDate);
      setAgeData(newAgeData);
    }, updateInterval);

    return () => clearInterval(interval);
  }, [birthDate, updateInterval]);

  const defaultContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: unitGap,
    flexWrap: "wrap",
    justifyContent: "center",
  };

  const units = [
    { show: showAge, value: ageData.years, label: "YEARS", key: "years" },
    { show: showMonths, value: ageData.months, label: "MONTHS", key: "months" },
    { show: showDays, value: ageData.days, label: "DAYS", key: "days" },
    { show: showHours, value: ageData.hours, label: "HOURS", key: "hours" },
    {
      show: showMinutes,
      value: ageData.minutes,
      label: "MINUTES",
      key: "minutes",
    },
    {
      show: showSeconds,
      value: ageData.seconds,
      label: "SECONDS",
      key: "seconds",
    },
  ].filter((unit) => unit.show);

  return (
    <div style={{ ...defaultContainerStyle, ...containerStyle }}>
      {units.map((unit) => (
        <CounterUnit
          key={unit.key}
          value={unit.value}
          label={unit.label}
          places={getPlacesForValue(unit.value)}
          fontSize={fontSize}
          padding={padding}
          gap={gap}
          borderRadius={borderRadius}
          horizontalPadding={horizontalPadding}
          textColor={textColor}
          fontWeight={fontWeight}
          digitStyle={digitStyle}
          labelStyle={labelStyle}
        />
      ))}
    </div>
  );
}