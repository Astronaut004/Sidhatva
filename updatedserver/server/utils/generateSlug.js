export default function generateSlug(str) {
  return str
    .toLowerCase()                 // convert to lowercase
    .trim()                        // remove extra spaces from start & end
    .replace(/[^a-z0-9\s-]/g, '')  // remove special characters
    .replace(/\s+/g, '-')          // replace spaces with dashes
    .replace(/-+/g, '-');          // remove multiple da    shes
}
