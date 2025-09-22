"use client";

const reviews = [
  {
    description: "“This app completely changed how I manage my day, everything feels more organized and less stressful.”",
    profile_picture: "/review_first_photo.png",
    name: "Rifki Alaudin",
    position: "Student",
  },
  {
    description: "“It has a minimalist look, and there is a progression system.”",
    profile_picture: "/review_second_photo.png",
    name: "Muhammad Felda",
    position: "Student",
  },
  {
    description: "“Interesting, you can track your task progress and become more productive.”",
    profile_picture: "/review_third_photo.png",
    name: "Nanda Ahmad Zidan",
    position: "Student",
  },
  {
    description: "“There is a feature to mark the percentage of progress of a task.”",
    profile_picture: "/review_fourth_photo.png",
    name: "Fajar Sidiq",
    position: "Student",
  },
];
export default function Review() {
  return (
    <section id="review" className="bg-white pb-10">
      <div className="relative pt-20 pb-10 bg-gradient-to-b from-[#7B6EF24D] via-transparent to-transparent">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-xl font-bold text-[#7B6EF2]">REVIEW</h2>
          <p className="mt-2 text-lg font-semibold">What they Say About Us?</p>
          <p className="text-gray-600">All the tools you need, built to keep you focused and in control</p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((r) => (
              <article key={r.name} className="flex h-full flex-col justify-between rounded-xl bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
                <p className="text-gray-700 text-m leading-relaxed">{r.description}</p>

                <div className="flex flex-col items-center">
                  <img src={r.profile_picture} alt={r.name} className="mb-4 h-40 w-40 rounded-full object-cover" />
                  <h3 className="font-semibold text-gray-900">{r.name}</h3>
                  <p className="text-sm text-gray-500">{r.position}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
