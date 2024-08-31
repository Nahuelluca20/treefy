export function getFirstHeader(jsonData: object) {
  let lowestOrder = Infinity;
  let headingOneText = "";

  Object.values(jsonData).forEach((item) => {
    if (item.type === "HeadingOne" && item.meta.order < lowestOrder) {
      lowestOrder = item.meta.order;
      headingOneText = item.value[0].children[0].text;
    }
  });

  return headingOneText;
}
