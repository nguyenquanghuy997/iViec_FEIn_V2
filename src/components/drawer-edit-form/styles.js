export const drawerPaperStyle = ({ palette, width = 800, contentStyles = {} }) => ({
  height: '100vh',
  width: width + 'px',
  maxWidth: '95%',
  boxShadow: '-3px 0px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
  overflow: 'hidden',
  '.edit-header': {
    padding: '15px 24px',
    borderBottom: "1px solid " + palette.text.border,
  },
  '> form': {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  '.role-actions-table': {
    '.MuiTableHead-root': {
      'tr th': {
        background: '#fff',
      },
    },
  },
  '.edit-container': {
    flex: 1,
    overflow: 'auto',
    padding: '24px',
    ...contentStyles,
  },
  '.edit-footer': {
    background: "#FDFDFD",
    padding: "14px 24px",
    borderTop: '1px solid ' + palette.text.border,
  },
});