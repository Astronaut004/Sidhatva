import generateSlug from "./generateSlug.js";

export default function generateSeoTitle(name, description) {
  let base;

  if (description != null) {
    base = `${name} ${description}`.split(" ").slice(0, 8).join(" "); 
  } else {
    base = name.split(" ").slice(0, 8).join(" ");
  }

  return generateSlug(base);
}