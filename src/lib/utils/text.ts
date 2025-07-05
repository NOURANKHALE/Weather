export const getTextDirection = (lang?: string): "rtl" | "ltr" => {
  return ["ar"].includes(lang || "") ? "rtl" : "ltr";
};