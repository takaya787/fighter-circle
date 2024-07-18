import { AuthenticatedLayout } from '@/components/AuthenticatedLayout';

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
