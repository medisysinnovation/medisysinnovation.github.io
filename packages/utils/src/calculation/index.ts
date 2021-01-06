export const getAbsPoint = (id: string) => {
  return document.getElementById(id)?.getBoundingClientRect();
};

export const getMaxHeight = (
  screenHeight: number | undefined,
  id: string,
  bottomSpacing: number = 0,
  minHeight: number | undefined = undefined
) => {
  const mainContentBottomMargin = 24;
  const pos = getAbsPoint(id);
  if (!screenHeight || !pos) return minHeight;
  if (pos) {
    const maxheight =
      screenHeight - pos.top - mainContentBottomMargin - bottomSpacing; // 24 is padding bottom
    if (maxheight) {
      return maxheight >= (minHeight ?? 0) ? maxheight : minHeight;
    }
  }
  return minHeight;
};
