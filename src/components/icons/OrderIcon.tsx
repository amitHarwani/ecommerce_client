const OrderIcon = (props: { className: string }) => {
  const { className = '' } = props;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <rect x="5" y="4" width="14" height="17" rx="2" stroke="currentColor"></rect>
        <path d="M9 9H15" stroke="currentColor" stroke-linecap="round"></path>
        <path d="M9 13H15" stroke="currentColor" stroke-linecap="round"></path>
        <path d="M9 17H13" stroke="currentColor" stroke-linecap="round"></path>
      </g>
    </svg>
  );
};

export default OrderIcon;
