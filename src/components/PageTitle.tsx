import React, { useState } from "react";

interface ChildProps {
  title: string;
  color: string;
  accentColor: string;
}

export function PageTitle({ title, color, accentColor }: ChildProps) {
  return (
    <div className="pt-8 pb-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mt-16">
        {title}
      </h1>
      <div className="pt-8 pb-6 text-center">
        <div
          className="w-24 h-1 mx-auto transition-all duration-500"
          style={{
            background: `linear-gradient(to right, ${color}, ${accentColor})`,
          }}
        />
      </div>
    </div>
  );
}
