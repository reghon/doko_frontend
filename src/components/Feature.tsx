"use client";

const features = [
  {
    icon: "/feature_homeicon.svg",
    alt: "Home feature",
    title: "Intuitive Homepage",
    desc: "Track all your daily tasks in a clean, simple calendar",
  },
  {
    icon: "/feature_taskicon.svg",
    alt: "Task feature",
    title: "Organize your Task",
    desc: "Keep everything neat by grouping tasks",
  },
  {
    icon: "/feature_ringicon.svg",
    alt: "Reminder feature",
    title: "Get Reminders",
    desc: "Stay on time with smart reminders for upcoming deadlines",
  },
  {
    icon: "/feature_clockicon.svg",
    alt: "Schedule feature",
    title: "Keep your Focus",
    desc: "Boost productivity with a built-in focus timer",
  },
];

export default function FeatureSection() {
  return (
    <section id="feature" className="py-15 pb-30">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-xl font-bold text-[#7B6EF2]">FEATURE</h2>
        <p className="mt-2 text-lg font-semibold">Make Productivity Simple</p>
        <p className="text-gray-600">All the tools you need, built to keep you focused and in control</p>
      </div>

      <div className="mx-auto mt-10 max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center gap-10 px-4">
        <div className="h-auto max-h-[400px] w-auto mb-10">
          <img src="/feature_phoneicon.svg" alt="Phone preview" className="h-auto max-h-[520px] w-auto" />
        </div>

        <div className="flex flex-col items-start gap-6">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-2">
              <img src={f.icon} alt={f.alt} className="h-15 w-15 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
