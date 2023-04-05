import { createContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import useAuth from '@/hooks/useAuth'

const RoleContext = createContext()

const RoleProvider = ({ children }) => {
  const { permissions } = useAuth();

  const canAccess = useCallback((action) => {
    if (!action) {
      return false;
    }

    if (!Array.isArray(action)) {
      action = [action];
    }

    let hasPermiss = true;
    action.map(ac => {
      if (!permissions.includes(ac)) {
        hasPermiss = false;
      }
    });

    return hasPermiss;
  }, [permissions]);

  return (
    <RoleContext.Provider
      value={{
        canAccess,
      }}
    >
      {children}
    </RoleContext.Provider>
  )
}

RoleProvider.propTypes = {
  children: PropTypes.node,
}

export { RoleContext, RoleProvider }
