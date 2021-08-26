import * as React from 'react'

const GroupNamesContext = React.createContext()

function GroupNamesProvider({ groupNames, children }) {
  return (
    <GroupNamesContext.Provider value={groupNames}>
      {children}
    </GroupNamesContext.Provider>
  )
}

function useGroupNames() {
  const context = React.useContext(GroupNamesContext)

  if (context === undefined) {
    throw new Error('useGroupNames muse be used within a GroupNamesProvider')
  }

  return context
}

export { GroupNamesProvider, useGroupNames }
