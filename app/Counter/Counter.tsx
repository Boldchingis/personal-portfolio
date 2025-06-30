"use client";
import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface NumberProps {
  mv: MotionValue<number>;
  number: number;
  height: number;
}

function Number({ mv, number, height }: NumberProps) {
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

interface DigitProps {
  place: number;
  value: number;
  height: number;
  digitStyle?: React.CSSProperties;
}

function Digit({ place, value, height, digitStyle }: DigitProps) {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  const defaultStyle: React.CSSProperties = {
    height,
    position: "relative",
    width: "1ch",
    fontVariantNumeric: "tabular-nums",
  };

  return (
    <div style={{ ...defaultStyle, ...digitStyle }}>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </div>
  );
}

interface CounterUnitProps {
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
  gradientHeight: number;
  gradientFrom: string;
  gradientTo: string;
  topGradientStyle?: React.CSSProperties;
  bottomGradientStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
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
  gradientHeight,
  gradientFrom,
  gradientTo,
  topGradientStyle,
  bottomGradientStyle,
  labelStyle,
}: CounterUnitProps) {
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
  };

  const gradientContainerStyle: React.CSSProperties = {
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  const defaultTopGradientStyle: React.CSSProperties = {
    height: gradientHeight,
    background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
  };

  const defaultBottomGradientStyle: React.CSSProperties = {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: gradientHeight,
    background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`,
  };

  const defaultLabelStyle: React.CSSProperties = {
    fontSize: fontSize * 0.3,
    color: textColor,
    textAlign: "center",
    marginTop: 4,
    fontWeight: "normal",
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
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
        <div style={gradientContainerStyle}>
          <div
            style={
              topGradientStyle ? topGradientStyle : defaultTopGradientStyle
            }
          />
          <div
            style={
              bottomGradientStyle
                ? bottomGradientStyle
                : defaultBottomGradientStyle
            }
          />
        </div>
      </div>
      <div style={{ ...defaultLabelStyle, ...labelStyle }}>{label}</div>
    </div>
  );
}

interface BirthdayCounterProps {
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
  gradientHeight?: number;
  gradientFrom?: string;
  gradientTo?: string;
  topGradientStyle?: React.CSSProperties;
  bottomGradientStyle?: React.CSSProperties;
  updateInterval?: number;
  showAge?: boolean;
  showMonths?: boolean;
  showDays?: boolean;
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
}

interface TimeUntilBirthday {
  currentAge: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeUntilBirthday(birthDate: string): TimeUntilBirthday {
  const now = new Date();
  const birth = new Date(birthDate);

  // Calculate current age
  let currentAge = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    currentAge--;
  }

  // Calculate next birthday
  const nextBirthday = new Date(birth);
  nextBirthday.setFullYear(now.getFullYear());

  // If birthday already passed this year, set it to next year
  if (nextBirthday <= now) {
    nextBirthday.setFullYear(now.getFullYear() + 1);
  }

  // Calculate time difference in milliseconds
  const timeDiff = nextBirthday.getTime() - now.getTime();

  if (timeDiff <= 0) {
    return { currentAge, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  // More accurate calculation using date manipulation
  let tempDate = new Date(now);
  let months = 0;

  // Calculate months
  while (
    tempDate.getMonth() !== nextBirthday.getMonth() ||
    tempDate.getFullYear() !== nextBirthday.getFullYear()
  ) {
    tempDate.setMonth(tempDate.getMonth() + 1);
    if (tempDate <= nextBirthday) {
      months++;
    } else {
      tempDate.setMonth(tempDate.getMonth() - 1);
      break;
    }
  }

  // Calculate remaining time after months
  const remainingTime = nextBirthday.getTime() - tempDate.getTime();
  const totalSeconds = Math.floor(remainingTime / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  const days = totalDays;
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;

  return {
    currentAge,
    months,
    days,
    hours,
    minutes,
    seconds,
  };
}

function getPlacesForValue(value: number): number[] {
  if (value < 10) return [1];
  if (value < 100) return [10, 1];
  return [100, 10, 1];
}

export default function BirthdayCounter({
  birthDate,
  fontSize = 60,
  padding = 0,
  gap = 4,
  unitGap = 20,
  borderRadius = 8,
  horizontalPadding = 12,
  textColor = "white",
  fontWeight = "bold",
  containerStyle,
  digitStyle,
  labelStyle,
  gradientHeight = 12,
  gradientFrom = "black",
  gradientTo = "transparent",
  topGradientStyle,
  bottomGradientStyle,
  updateInterval = 1000,
  showAge = true,
  showMonths = true,
  showDays = true,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
}: BirthdayCounterProps) {
  const [timeData, setTimeData] = useState(() =>
    calculateTimeUntilBirthday(birthDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeData = calculateTimeUntilBirthday(birthDate);
      setTimeData(newTimeData);
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
    { show: showAge, value: timeData.currentAge, label: "AGE", key: "age" },
    {
      show: showMonths,
      value: timeData.months,
      label: "MONTHS",
      key: "months",
    },
    { show: showDays, value: timeData.days, label: "DAYS", key: "days" },
    { show: showHours, value: timeData.hours, label: "HOURS", key: "hours" },
    {
      show: showMinutes,
      value: timeData.minutes,
      label: "MINUTES",
      key: "minutes",
    },
    {
      show: showSeconds,
      value: timeData.seconds,
      label: "SECONDS",
      key: "seconds",
    },
  ].filter((unit) => unit.show);

  return (
    <div className="font-mono" style={{ ...defaultContainerStyle, ...containerStyle }}>
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
          gradientHeight={gradientHeight}
          gradientFrom={gradientFrom}
          gradientTo={gradientTo}
          topGradientStyle={topGradientStyle}
          bottomGradientStyle={bottomGradientStyle}
        />
      ))}
    </div>
  );
}
