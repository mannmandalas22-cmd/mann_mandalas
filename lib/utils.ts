import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Cloudinary helpers
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";

export type CloudinaryOptions = {
  width?: number | "auto";
  height?: number | "auto";
  quality?: number | "auto";
  crop?: "fill" | "fit" | "scale" | "thumb" | "auto";
  gravity?: "auto" | "center" | string;
  format?: "auto" | string;
  dpr?: number | "auto";
  additional?: string[];
  eager?: boolean;
  original?: boolean;
};

export function buildCloudinaryUrl(path: string, opts: CloudinaryOptions = {}): string {
  if (!path) return "";
  const {
    width = "auto",
    height = "auto",
    quality = "auto",
    crop = "fill",
    gravity = "auto",
    format = "auto",
    dpr = "auto",
    additional = [],
    original = false,
  } = opts;

  const transformations = original
    ? additional.join(",")
    : [
        width === "auto" ? "w_auto" : `w_${width}`,
        height === "auto" ? "h_auto" : `h_${height}`,
        `c_${crop}`,
        `g_${gravity}`,
        `q_${quality}`,
        `f_${format}`,
        dpr === "auto" ? "dpr_auto" : `dpr_${dpr}`,
        ...additional,
      ].filter(Boolean).join(",");

  // If the input looks like an absolute Cloudinary URL, just inject transformations after /upload/
  if (path.startsWith("http")) {
    if (!transformations) return path;
    return path.replace("/upload/", `/upload/${transformations}/`);
  }

  const base = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;
  const normalized = path.replace(/^\/+/, "");
  return transformations
    ? `${base}/${transformations}/${normalized}`
    : `${base}/${normalized}`;
}

export const cloudinaryLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  return buildCloudinaryUrl(src, { width, quality: quality ?? 75, height: "auto", crop: "fill", gravity: "auto", format: "auto" });
};
