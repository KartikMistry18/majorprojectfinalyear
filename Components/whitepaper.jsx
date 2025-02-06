import React from "react";

const WhitePaper = ({ title, content, sidebarItems }) => {
  const handleDownload = () => {
    window.print();
  };
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4 px-4 py-8">
      {/* Sidebar */}
      <aside className="col-span-3 bg-gray-100 p-4 rounded-lg ">
        <h2 className="text-xl font-semibold mb-2">Introduction</h2>
        <ul className="space-y-2 font-semibold text-xl">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <a
                href={`#${item.id}`}
                className="text-black-500 hover:underline text-xl font-semibold"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="col-span-9">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <div className="flex justify-between items-center mb-6">
          <button
            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold"
            onClick={handleDownload}
          >
            Download PDF
          </button>
          <select className="border rounded px-2 py-1">
            <option>English</option>
            {/* Add more languages as needed */}
          </select>
        </div>

        {content.map((section, index) => (
          <div key={index}>
            <h2 id={section.id} className="text-2xl font-semibold mb-2">
              {section.title}
            </h2>
            <p className="mb-4">{section.text}</p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default WhitePaper;
