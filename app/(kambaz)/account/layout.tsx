import AccountNavigation from "./Navigation";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="d-flex p-4">
      <div style={{ width: 200 }} className="me-4">
        <AccountNavigation />
      </div>
      <div className="flex-fill">{children}</div>
    </div>
  );
}
