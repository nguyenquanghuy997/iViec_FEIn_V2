export const drawerPaperStyle = ({ palette }) => ({
  height: '100vh',
  width: '800px',
  maxWidth: '95%',
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
    color: 'red',
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
  },
  '.edit-footer': {
    background: "#FDFDFD",
    padding: "14px 24px",
    borderTop: '1px solid ' + palette.text.border,
  },
});