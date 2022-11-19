const HeroSectionSVG = () => {
  return (
    <div className="w-full">
      <svg viewBox="0 0 1440 712" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
        <g id="Group 9">
          <path id="bg" d="M0 0H1440V712H0V0Z" fill="#236DC4" />
          <g id="Blob" opacity="0.8">
            <mask
              id="mask0_4074_93"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="712"
            >
              <rect id="bg_2" width="1440" height="712" fill="#292830" />
            </mask>
            <g mask="url(#mask0_4074_93)">
              <path
                id="bottom_bubble"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M387.67 620.764C395.452 702.452 401.847 792.74 350.399 854.41C296.984 918.437 209.466 934.065 128.59 931.316C50.5386 928.663 -26.3692 900.235 -79.351 839.803C-130.523 781.435 -147.952 700.087 -143.678 620.763C-139.655 546.114 -103.276 481.962 -57.0141 425.253C-5.67644 362.322 49.8253 286.047 128.59 287.009C207.03 287.967 260.285 365.765 309.941 429.734C353.22 485.488 380.843 549.103 387.67 620.764Z"
                fill="#86D3FF"
                className="animate-bubble"
              />
              <path
                id="top_bubble"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1322.2 451.506C1232.25 446.511 1150.62 401.123 1092.57 335.71C1039.19 275.559 1029.16 196.311 1025.97 117.717C1022.6 34.6612 1016.81 -54.9428 1074.17 -117.738C1134.36 -183.621 1231.18 -218.379 1322.2 -206.577C1405.57 -195.767 1456.39 -122.235 1510.6 -61.1464C1558.17 -7.5544 1598.63 48.4769 1610.02 117.717C1623.92 202.176 1637.39 296.647 1580.35 362.794C1520.09 432.681 1417.17 456.779 1322.2 451.506Z"
                fill="#86D3FF"
                className="animate-bubble origin-center"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default HeroSectionSVG;
