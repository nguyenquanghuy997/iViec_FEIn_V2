import { createContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import useAuth from '@/hooks/useAuth'
import { PERMISSIONS } from '@/config'

const RoleContext = createContext({
  canAccess: () => {},
})

const RoleProvider = ({ children }) => {
  const { permissions } = useAuth();

  const canAccess = useCallback((action) => {
    if (!action || permissions.includes(PERMISSIONS.IVIEC_ADMIN) || action.includes(PERMISSIONS.VIEW_COMPANY)) {
      return true;
    }

    if (!Array.isArray(action)) {
      action = [action];
    }

    if (
      permissions.includes(PERMISSIONS.ADMINISTRATOR)
      && !action.includes(PERMISSIONS.IVIEC_ADMIN)
    ) {
      return true;
    }

    let hasPermiss = false;
    action.map(ac => {
      if (permissions.includes(ac)) {
        hasPermiss = true;
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
