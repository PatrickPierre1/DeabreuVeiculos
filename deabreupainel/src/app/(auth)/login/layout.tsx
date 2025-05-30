import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Painel Veiculos",
    description: "",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body>
                <div>
                    {children}
                </div>
            </body>
        </html>
    );
}