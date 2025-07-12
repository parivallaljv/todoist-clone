import Sidebar from "./today/Sidebar";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">Home Page</main>
    </div>
  );
}
