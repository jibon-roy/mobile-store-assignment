export default function LandingCard({mobile}) {
  return (
    <div>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
            <img src={mobile?.image} className="w-[80%] transform transition duration-300 group-hover:scale-x-[-1]" alt="Mobile" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{mobile.name}</h2>
          <p>Click the button to watch on Jetflix app.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Watch</button>
          </div>
        </div>
      </div>
    </div>
  );
}
