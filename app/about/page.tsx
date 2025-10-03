import React from "react";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">About Swift Club SLU</h1>
      <p className="text-gray-800 leading-7">
        We are a community of Suzuki Swift owners and enthusiasts in Saint Lucia.
        We stand for safe driving, respect for fellow road users, and uplifting our local car culture.
      </p>

      <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-800">
        <li>Regular meets, events, and socials</li>
        <li>Sharing knowledge on maintenance, mods, and expertise</li>
        <li>Community involvement and charity runs</li>
      </ul>

      {/* NEW: Requirements */}
      <div className="mt-8 p-5 border rounded-lg bg-white">
        <h2 className="text-xl font-semibold">Requirements for Membership</h2>
        <p className="text-gray-700 mt-2">
          To keep the club focused and welcoming, we ask that applicants meet the following:
        </p>
        <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-800">
          <li>Own or be an enthusiast of the Suzuki Swift (all generations welcome).</li>
          <li>Membership is open to anybody 18 and older.</li>
          <li>Registration fees are as follows:
            New: EC $30
            Existing: EC $15
          </li>
          <li>Agree to our safety-first driving ethos and respect for road laws.</li>
          <li>Participate in club activities in some form (meets, cruises, community events).</li>
          
          <li>A member in arrears for over two months of their dues is liable to pay a fine set by the committee/board.</li>
          <li>A member who fails to pay their dues or registration fee within four months will discontinue their membership. There is an exception for extenuating circumstances in which the board has the final say.</li>
        </ul>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="odometer-badge">Annual fee: EC $60</span>
          <span className="odometer-badge">Location: Saint Lucia</span>
          <a
            href="https://form.jotform.com/233574837581871"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-light"
          >
            Apply for Membership
          </a>
        </div>
      </div>

      {/* Existing rules block */}
      <div className="mt-8 p-4 border rounded bg-gray-50">
        <h2 className="font-semibold">Club Rules / Code of Conduct</h2>
        <p className="text-sm text-gray-700 mt-1">
          <li>Maintain a positive, supportive attitude in meets and online spaces.</li>
          <li>No street racing, reckless driving, or dangerous behavior while representing the club.</li>
          <li>Respect all members, be considerate and inclusive. Respect is something we do not compromise on.</li>
          <li>Abide by all local traffic laws and regulations.</li>
          <li>Report any unsafe behavior to the board.</li>
          <li>Failure to adhere to these rules may result in suspension or expulsion from the club.</li>
        </p>
      </div>
    </div>
  );
}
