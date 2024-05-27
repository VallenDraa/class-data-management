export function Bulet() {
  return (
    <div className="absolute -top-16 w-32 h-32 bg-blue-500 rounded-full opacity-30" style={{ zIndex: 1 }}></div>
  );
}

export function Bulet2() {
  return (
    <div className="absolute -left-16 w-32 h-32 bg-blue-500 rounded-full opacity-30" style={{ zIndex: 2, top: '0' }}></div>
  );
}

export function Bulet3() {
  return (
    <div className="relative w-32 h-32">
      <Bulet />
      <Bulet2 />
    </div>
  );
}
