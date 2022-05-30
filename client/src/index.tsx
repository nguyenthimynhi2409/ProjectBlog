import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { store } from "./store";
import App from "./App";

const rootElement =  document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
