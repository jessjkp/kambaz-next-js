"use client"

import AccountNavigation from "./Navigation";
import store from "../store";
import { Provider } from "react-redux";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store ={store}>
          <div className="d-flex p-4">
        <div style={{ width: 200 }} className="me-4">
          <AccountNavigation />
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </Provider>

  );
}
