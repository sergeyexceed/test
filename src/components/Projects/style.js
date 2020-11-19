const styles = {
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  title: {
    margin: "16px 0 8px",
  },
  badgeDanger: {
    color: "firebrick",
  },
  badge: {
    margin: "0 15px",
  },
  badgeWarning: {
    color: "darkorange",
  },
  badgeSuccess: {
    color: "green",
  },
  list: {
    minWidth: "60vh",
    "&:hover": {
      cursor: "pointer",
    },
  },
  listItem: {
    border: "0.5px solid gray",
    borderRadius: "6px",
    marginBottom: "6px",
  },
};

export default styles;
