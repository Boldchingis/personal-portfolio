import BirthdayCounter from "../Counter/Counter";

export default function Main() {
  return (
    <div className="flex justify-center h-screen items-center ">
      <BirthdayCounter
        birthDate="2006-07-20"
        fontSize={80}
        showAge={true}
        showMonths={false}
        showDays={true}
        showHours={true}
        textColor="#ffffff"
        fontWeight={800}
      />
    </div>
  );
}
