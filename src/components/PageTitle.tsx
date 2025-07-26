import React, { useState } from "react";

interface ChildProps {
  title: string;
}

export function PageTitle({ title }: ChildProps) {
  return (
    <div className="mt-24 mb-8">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">{title}</h1>
    </div>
  );
}
