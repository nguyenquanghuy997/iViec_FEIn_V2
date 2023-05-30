import {Chip} from '@mui/material';

const ChipDS = ({ label, onClick, onDelete, variant = "outlined", icon, deleteIcon, color = "default", size = 'small', ...props}) => {
  return (<Chip
      label={label}
      onClick={onClick}
      onDelete={onDelete}
      deleteIcon={deleteIcon}
      variant={variant}
      icon={icon}
      color={color}
      size={size}
      {...props}
  />)
}

export default ChipDS;