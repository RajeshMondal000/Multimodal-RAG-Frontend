import Header from "./Header";
import Sidebar from "./Sidebar";
import ChatWindow from "../chat/ChatWindow";

export default function AppLayout() {
    return (
        <div className="flex h-screen flex-col bg-slate-950 text-slate-100">

            <Header />

            <main className="flex flex-1 overflow-hidden">

                <Sidebar />

                <section className="flex flex-1">
                    <ChatWindow />
                </section>

            </main>

        </div>
    );
}