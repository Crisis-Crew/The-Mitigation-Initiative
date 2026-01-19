import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date : string) {
  const dateObj = new Date(date)
  return dateObj.toLocaleString("en-UK", {
    dateStyle : "long"
  })
}