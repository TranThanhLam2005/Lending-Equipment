import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "@/App";
import LendingModal from "@/components/ui/common/LendingModal";
import Provider from "@/store/Provider";
createRoot(document.getElementById("root")!).render(
  //<StrictMode>
  <Provider>
    <App />
  </Provider>
  //</StrictMode>,
);
