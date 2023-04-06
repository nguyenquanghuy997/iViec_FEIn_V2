import { createContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import useAuth from '@/hooks/useAuth'
import { PERMISSIONS } from '@/config'

const RoleContext = createContext({
  canAccess: () => {},
})

const RoleProvider = ({ children }) => {
  const { permissions } = useAuth();
  const AdminPermiss = PERMISSIONS.ADMINISTRATOR;

  const canAccess = useCallback((action) => {
    if (!action || permissions.includes(AdminPermiss)) {
      return true;
    }

    if (!Array.isArray(action)) {
      action = [action];
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
