import useBillboard from "@/hooks/useBillboard.ts";
import React from "react";

const Billboard = () => {
  const { data } = useBillboard();

  return (
    <div className="relative h-[56.25vw]">
      <img src="" alt="Poster" />
    </div>
  );
};

export default Billboard;
