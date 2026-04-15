import { useState } from 'react'
import type { ModuleKey } from '../content/moduleCards'

export function useModuleSelection(initialModule: ModuleKey) {
  const [selectedModule, setSelectedModule] = useState<ModuleKey>(initialModule)

  return {
    selectedModule,
    selectModule: setSelectedModule,
  }
}
