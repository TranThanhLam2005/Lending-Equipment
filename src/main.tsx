import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/App'
import EquipmentDetail from '@/pages/student/EquipmentDetail'
import Provider from '@/store/Provider'
createRoot(document.getElementById('root')!).render(
  //<StrictMode>
    <Provider>
      <App />
    </Provider>
  //</StrictMode>,
)
