import AppBar from '@/components/v2/AppBar';
import { Separator } from '@/components/ui/separator';

const default_data = [
    {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
    {
        firstName: 'joe',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
];

export default function BlacklistRoute() {
    return (
        <div className="h-screen w-screen flex flex-col">
            <AppBar />
            <Separator />
            <div className="flex-1">TODO: Blacklists</div>
        </div>
    );
}
