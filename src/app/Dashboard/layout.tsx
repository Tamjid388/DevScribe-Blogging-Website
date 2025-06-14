import Sidebar from "@/Components/Dashboard/Sidebar"
import Stats from "@/Components/Dashboard/Stats"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section>
        <h1>Dashboard</h1>
        <Stats />
        <hr className="mt-6" />

        <main className="grid grid-cols-12 py-12 gap-6">
            <div className="col-span-2">
                <Sidebar />
            </div>

            <div className="  col-span-10">
                {children}
            </div>
        </main>

    </section>
}