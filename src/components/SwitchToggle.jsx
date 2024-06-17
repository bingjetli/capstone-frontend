export default function SwitchToggle({ value, onToggle }) {
    return (
        <div
            className={`${
                value ? 'bg-emerald-500' : 'bg-slate-200'
            } min-w-12 min-h-5 rounded-xl border`}
            onClick={(e) => onToggle(e)}
        >
            <div
                className={`min-h-4 min-w-6 bg-slate-50 border border-2 rounded-full inline-block -translate-x-[${
                    value ? '-' : ''
                }1rem] ${value ? 'border-emerald-500' : ''}`}
            >
                &nbsp;
            </div>
        </div>
    );
}
