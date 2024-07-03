import { useRouteError } from 'react-router-dom';
import AppBar from '@/components/v2/AppBar';
import { Separator } from '@/components/ui/separator';

export default function ErrorsRoute() {
    const route_error = useRouteError();
    console.error(route_error);

    return (
        <div className="flex flex-col h-screen w-screen">
            <AppBar />
            <Separator />
            <div className="grow p-4 flex flex-col justify-center items-center">
                <h1 className="text-5xl leading-relaxed">Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <code className="text-muted-foreground mt-4">
                    <em>{route_error.statusText || route_error.message}</em>
                </code>
            </div>
        </div>
    );
}
