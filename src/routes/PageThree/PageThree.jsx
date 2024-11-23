import React from "react";

const PageThree = () => {
  return (
    <div
      className="relative bg-cover bg-center min-h-screen bg-[url('./public/building-background.png')]"
    >

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-white px-8">
        {/* Header */}
        <div className="text-xl md:text-xl lg:text-2xl font-semibold text-right max-w-7xl mt-40 leading-relaxed">
          <h1>Through JLPro, IBTEC is created to be the largest sandbox ecosystem in Asia that </h1>
          <h1>unites new-age industrialists, digital pioneers, and lifelong learners in a high-tech </h1>
          <h1>environment that aims to supercharge growth seamlessly and sustainably.</h1>
        </div>
        {/* Details Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 w-full max-w-7xl text-cyan-400 mt-12">
          {/* Detail Item */}
          <div className="text-left">
            <h2 className="text-lg font-bold">TOTAL</h2>
            <h2 className="text-lg font-bold">ACREAGE</h2>
            <p className="text-7xl font-extrabold">7,290</p>
            <p className="text-4xl">Acres</p>
            <p className="text-sm">( 2,950 Hectares )</p>
          </div>

          <div className="text-right">
            <p className=" font-bold">JOB CREATION</p>
            <p className="font-bold">OF UP TO</p>
            <h1 className="text-7xl font-extrabold">330,000</h1>
            <h3 className="text-lg font-bold">JOBS</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 w-full lg:w-5xl max-w-7xl text-cyan-400 mt-12">
          {/* Detail Item */}
          <div className="text-left">
            <h2 className="text-lg font-bold">DEVELOPMENT </h2>
            <h2 className="text-lg">PERIOD</h2>
            <p className="text-7xl font-extrabold">Up to </p>
            <p className="text-7xl">2047</p>
          </div>

          <div className="text-right">
            <p className=" font-bold">GROSS DEVELOPMENT</p>
            <p>OF UP TO</p>
            <h1 className="text-7xl font-extrabold">RM27</h1>
            <h3 className="text-2xl font-bold">Billion</h3>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PageThree;