export default function Heading({ heading, children, left }) {
  return (
    <div>
      <div className={`max-w-md ${left ? "text-left" : "text-center"} `}>
        <h1 className="text-3xl min-[320px]:text-4xl font-bold">{heading}</h1>
        <p className="py-4 text-lg text-primary-red">{children && children}</p>
      </div>
    </div>
  );
}
