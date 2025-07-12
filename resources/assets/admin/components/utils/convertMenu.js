export const convertMenu = (items) => {
  return items.map((item) => {
    if (item.submenu && item.submenu.length > 0) {
      return {
        name: item.name,
        subItems: item.submenu.map((sub) => ({
          name: sub.name,
          path: sub.urn,
        })),
      };
    }

    return {
      name: item.name,
      path: item.urn,
    };
  });
};
