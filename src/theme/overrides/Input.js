export default function Input(theme) {
  return {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.MuiInputLabel-root[data-shrink="false"]': {
            transform: 'translate(14px, 8px) scale(1)',
          },
        },
        asterisk: {
          '&.MuiInputLabel-asterisk': {
            color: theme.palette.error.main,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            '& svg': { color: theme.palette.text.search },
          },
        },
        input: {
          '&::placeholder': {
            opacity: 1,
            color: theme.palette.text.secondary,
          },
          '&.MuiInputBase-input': {
            padding: '8px 14px',
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottomColor: theme.palette.grey[500_56],
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.grey[500_12],
          '&:hover': {
            backgroundColor: theme.palette.grey[500_16],
          },
          '&.Mui-focused': {
            backgroundColor: theme.palette.action.focus,
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.action.focus,
          },
        },
        underline: {
          '&:before': {
            borderBottomColor: theme.palette.grey[500_56],
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[500_32],
          },
          '&.Mui-disabled': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.action.focus,
            },
          },
        },
      },
    },
  }
}
