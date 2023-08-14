import Loader from "./Loader";
//bg-[#F5E9D8]
export const LayoutBase = ({ children }) => {
  return (
    <Loader>
      <main
        className="bg-[#FFD7C0] px-10 py-5 overflow-auto"
        style={{ height: "calc(100vh - 80px)" }}
      >
        {children}
      </main>
    </Loader>
  );
};
