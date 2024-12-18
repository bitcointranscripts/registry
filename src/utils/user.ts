"use client";

export const isMac = () => {
  if (typeof window === "undefined") {
    return null;
  }
  const OS = window.navigator.userAgent;
  return OS.search("Mac") !== -1;
};