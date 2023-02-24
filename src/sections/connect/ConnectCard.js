import PropTypes from "prop-types";
import {ConnectCardStyle} from "@/sections/connect/style";
import {Box} from "@mui/material";
const ConnectCardItem = ({ account }) => {
  return (
    <Box>
      {JSON.stringify(account)}
    </Box>
  )
}

const ConnectCard = ({ accounts }) => {
  return (
      <ConnectCardStyle>
        {accounts?.map(account => (
            <ConnectCardItem
              account={account}
            />
        ))}
      </ConnectCardStyle>
  )
}

ConnectCard.propTypes = {
  accounts: PropTypes.array,
}

ConnectCard.defaultProps = {
  accounts: []
}

export default ConnectCard;