import { forwardRef } from 'react'

// next
import Head from 'next/head'

// @mui
import { Box } from '@mui/material'

import PropTypes from 'prop-types'

const PageWrapper = forwardRef(({ children, title = '', meta, ...other }, ref) => (
  <>
    <Head>
      <title>{`${title}`}</title>
      {meta}
    </Head>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
))

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  meta: PropTypes.node,
}

export default PageWrapper
